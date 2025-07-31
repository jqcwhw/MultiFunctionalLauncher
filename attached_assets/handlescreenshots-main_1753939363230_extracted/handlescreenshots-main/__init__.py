import win32gui
import win32ui
import win32con
import sys
import numpy as np
import time
from appshwnd import find_window_and_make_best_window_unique
import re
from typing import Tuple, Optional, Dict, Union, List, Iterable


class Win32WindowCapture:
    def __init__(
        self,
        hwnd: int,
        crop: Tuple[int, int, int, int] = (0, 0, 0, 0),
        show_fps: bool = False,
        brg_to_rgb: bool = False,
        ignore_exceptions: bool = True,
    ) -> None:
        """
        Args:
            hwnd: The handle to the window.
            crop: A tuple specifying the cropping parameters (x0, y0, x1, y1). Default is (0, 0, 0, 0).
            show_fps: A boolean indicating whether to show frames per second. Default is False.
            brg_to_rgb: A boolean indicating whether to convert BRG to RGB. Default is False.
        """
        self.y0: int = crop[1]
        self.x1: int = crop[2]
        self.x0: int = crop[0]
        self.y1: int = crop[3]
        self.hwnd: int = hwnd
        self.window_rect: Tuple[int, int, int, int] = win32gui.GetWindowRect(self.hwnd)
        self.get_window_position()

        self.show_fps: bool = show_fps
        self.brg_to_rgb: bool = brg_to_rgb
        self.ignore_exceptions: bool = ignore_exceptions

    def get_window_position(self) -> Tuple[int, int, int, int]:
        """
        Get the position of the window and calculate its width and height.
        """
        self.window_rect = win32gui.GetWindowRect(self.hwnd)
        self.offset_x: int = self.window_rect[0]
        self.offset_y: int = self.window_rect[1]
        self.w: int = self.window_rect[2] - self.window_rect[0]
        self.h: int = self.window_rect[3] - self.window_rect[1]
        return self.window_rect

    def get_screenshot(
        self, brg_to_rgb: Optional[bool] = None
    ) -> list[
        Union[np.ndarray, List[int]], Tuple[int, int, int, int], int, int, int, int
    ]:
        """
        Takes a screenshot of the window.

        :param brg_to_rgb: (bool) Whether to convert the BGR image to RGB. Defaults to None, which uses the value of self.brg_to_rgb.
        :return: A list containing the screenshot image as a numpy array, the window rectangle, the offset x and y values, the width and height of the screenshot.
                If an error occurs, an empty numpy array and a tuple of -1 values is returned.
        """
        if brg_to_rgb is None:
            brg_to_rgb = self.brg_to_rgb
        allok = False
        try:
            self.get_window_position()
            wDC = win32gui.GetWindowDC(self.hwnd)
            dcObj = win32ui.CreateDCFromHandle(wDC)
            cDC = dcObj.CreateCompatibleDC()
            dataBitMap = win32ui.CreateBitmap()
            dataBitMap.CreateCompatibleBitmap(dcObj, self.w, self.h)
            cDC.SelectObject(dataBitMap)
            cDC.BitBlt((0, 0), (self.w, self.h), dcObj, (0, 0), win32con.SRCCOPY)
            signedIntsArray = dataBitMap.GetBitmapBits(True)
            img = np.frombuffer(signedIntsArray, dtype="uint8")
            img.shape = (self.h, self.w, 4)
            allok = True
        finally:
            try:
                dcObj.DeleteDC()
            except Exception:
                pass
            try:
                cDC.DeleteDC()
            except Exception:
                pass
            try:
                win32gui.ReleaseDC(self.hwnd, wDC)
            except Exception:
                pass
            try:
                win32gui.DeleteObject(dataBitMap.GetHandle())
            except Exception:
                pass
            if not allok:
                return [np.array([], dtype=np.uint8), (-1, -1, -1, -1), -1, -1, -1, -1]
        try:
            return [
                img[..., :3] if not brg_to_rgb else img[..., :3][..., ::-1],
                self.window_rect,
                self.offset_x,
                self.offset_y,
                self.w,
                self.h,
            ]
        except Exception as e:
            sys.stderr.write(str(e))
            sys.stderr.flush()
            return [np.array([], dtype=np.uint8), (-1, -1, -1, -1), -1, -1, -1, -1]

    def __iter__(
        self,
    ) -> Iterable[
        list[np.ndarray, Tuple[int, int, int, int], int, int, int, int, int, int]
    ]:
        """
        Parameters:
            None

        Returns:
            An iterator that yields a list containing a screenshot of the screen,
            the window rectangle, the offset top, the offset left, the width, the height,
            the end x, and the end y.
        """
        while True:
            try:
                if self.show_fps:
                    loop_time = time.time()
                (
                    ctypescreen,
                    window_rect,
                    offset_x,
                    offset_y,
                    w,
                    h,
                ) = self.get_screenshot(brg_to_rgb=self.brg_to_rgb)
                if len(ctypescreen.shape) == 0 and w == -1 and h == -1:
                    break
                new_h = ctypescreen.shape[0] - self.y0 - self.y1
                new_w = ctypescreen.shape[1] - self.x0 - self.x1
                new_offset_top = offset_y + self.y0
                new_offset_left = offset_x + self.x0
                new_end_x = new_offset_left + new_w
                new_end_y = new_offset_top + new_h
                yield (
                    ctypescreen[self.y0 : new_h, self.x0 : new_w],
                    window_rect,
                    new_offset_left,
                    new_offset_top,
                    new_w,
                    new_h,
                    new_end_x,
                    new_end_y,
                )
                if self.show_fps:
                    print(
                        "FPS {}            ".format(1 / (time.time() - loop_time)),
                        end="\r",
                    )
            except Exception as fe:
                if not self.ignore_exceptions:
                    raise fe
                sys.stderr.write(f"{fe}\n")
                sys.stderr.flush()
            except KeyboardInterrupt:
                try:
                    time.sleep(1)
                except:
                    pass
                break

    @staticmethod
    def find_window(
        searchdict: Dict[str, Union[int, str, Tuple[int, int, int, int]]],
    ) -> Dict[str, Union[int, str, Tuple[int, int, int, int]]]:
        """
        Find a hwnd of a window

        searchdict: dictionary containing search parameters
        returns: dictionary containing information about the best window found

        all searchdict options:
        searchdict = {
            "pid": 1004,
            "pid_re": "^1.*",
            "title": "IME",
            "title_re": "IM?E",
            "windowtext": "Default IME",
            "windowtext_re": r"Default\s*IME",
            "hwnd": 197666,
            "hwnd_re": r"\d+",
            "length": 12,
            "length_re": "[0-9]+",
            "tid": 6636,
            "tid_re": r"6\d+36",
            "status": "invisible",
            "status_re": "(?:in)?visible",
            "coords_client": (0, 0, 0, 0),
            "coords_client_re": r"\([\d,\s]+\)",
            "dim_client": (0, 0),
            "dim_client_re": "(1?0, 0)",
            "coords_win": (0, 0, 0, 0),
            "coords_win_re": r"\)$",
            "dim_win": (0, 0),
            "dim_win_re": "(1?0, 0)",
            "class_name": "IME",
            "class_name_re": "I?ME$",
            "path": "C:\\Windows\\ImmersiveControlPanel\\SystemSettings.exe",
            "path_re": "SystemSettings.exe",
        }

        """
        (
            bestwindows,
            bestwindow,
            hwnd,
            startwindowtext,
            updatedwindowtext,
            revertnamefunction,
        ) = find_window_and_make_best_window_unique(
            searchdict, timeout=60, make_unique=False, flags=re.I
        )
        return {
            "hwnd_of_best_window": hwnd,
            "window_text_of_best_window": startwindowtext,
            "bestwindow": bestwindow,
            "bestwindows": bestwindows,
        }



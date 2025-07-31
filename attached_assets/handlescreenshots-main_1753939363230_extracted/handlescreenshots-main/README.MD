# Fast screenshots of (background) windows with, includes a find_window method

## pip install handlescreenshots

### Tested against Windows 10 / Python 3.11 / Anaconda

## Win32WindowCapture Class

### The Win32WindowCapture class provides functionality to capture screenshots of windows on the Windows operating system. It leverages the pywin32 module, along with NumPy for image processing.

### Key Features:

#### Window Capture: 
Captures screenshots of specified (background) windows.

#### Window Cropping: 
Supports cropping of captured screenshots based on user-defined coordinates.

#### Frame Rate Display: 
Optionally displays frames per second (FPS) during capture.

#### Color Space Conversion: 
Supports conversion from BGR to RGB color space.

#### Error Handling: 
Implements robust error handling to ensure stability during capture operations.

```py
Class Methods:
__init__(self, hwnd: int, crop: Tuple[int, int, int, int] = (0, 0, 0, 0), show_fps: bool = False, brg_to_rgb: bool = False, ignore_exceptions: bool = True): Initializes a Win32WindowCapture instance with the specified window handle (hwnd). Additional parameters allow for customization of cropping, FPS display, color space conversion, and error handling.

get_window_position(self) -> Tuple[int, int, int, int]: Retrieves the position of the window and calculates its width and height.

get_screenshot(self, brg_to_rgb: Optional[bool] = None) -> Tuple[np.ndarray, Tuple[int, int, int, int], int, int, int, int]: Captures a screenshot of the window. Supports optional conversion from BGR to RGB color space.

__iter__(self) -> Iterable[Tuple[np.ndarray, Tuple[int, int, int, int], int, int, int, int, int, int]]: Implements an iterator that continuously captures screenshots of the window.
```
The find_window method provides a convenient way to locate windows based on various criteria defined in the searchdict parameter. 
This method offers several advantages:

Flexibility: By specifying different search parameters such as process ID, window title, window text, coordinates, class name, etc., users can locate windows in a variety of ways. This flexibility allows for precise window identification in diverse scenarios.

Customization: The searchdict parameter allows users to customize their search criteria according to their specific requirements. This customization empowers users to tailor window identification to the unique characteristics of their applications.

## find_window

```py

    find_window(searchdict: Dict[str, Union[int, str, Tuple[int, int, int, int]]]) -> Dict[str, Union[int, str, Tuple[int, int, int, int]]]: Static method to locate windows based on specified search parameters. Returns information about the best-matching window.
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
```

## How to use it 

```py
from handlescreenshots import Win32WindowCapture
import cv2
import time 
searchdict = {"windowtext_re": r".*Bluestacks.*", "path_re": ".*HD-Player.*"}
bestwindow = Win32WindowCapture.find_window(searchdict)
print(bestwindow)
print(bestwindow["hwnd_of_best_window"])
try:
    for pic in Win32WindowCapture(
        bestwindow["hwnd_of_best_window"],
        crop=(100, 20, 30, 40),
        show_fps=False,
        brg_to_rgb=False,
        ignore_exceptions=True,
    ):
        print(
            "window_rect_not_cropped",
            "offset_left",
            "offset_top",
            "w",
            "h",
            "end_x",
            "end_y",
            pic[1:],
            end="                             \r",
        )
        cv2.imshow(str(bestwindow["window_text_of_best_window"]), pic[0])
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break
except KeyboardInterrupt:
    try:
        time.sleep(1)
    except: 
        pass 
cv2.destroyAllWindows()

```
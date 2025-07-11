"""
Pet Simulator 99 - Legitimate Automation Helper
===============================================

This script provides legitimate automation helpers for Pet Simulator 99
that work within Roblox's Terms of Service by automating mouse/keyboard
actions rather than modifying game data.

IMPORTANT: This script automates USER INPUT, not game data modification.
It helps you play more efficiently but doesn't cheat or hack the game.
"""

import time
import pyautogui
import keyboard
import threading
import json
from datetime import datetime

class PetSimulator99Helper:
    def __init__(self):
        self.running = False
        self.egg_hatching = False
        self.pet_claiming = False
        self.strength_training = False
        
        # Configuration
        self.config = {
            "hatch_interval": 0.5,  # Time between egg hatches
            "claim_interval": 0.3,  # Time between pet claims
            "training_interval": 1.0,  # Time between gym actions
            "safety_delay": 0.1,  # Safety delay between actions
        }
        
        # Screen positions (you'll need to calibrate these)
        self.positions = {
            "egg_hatch_button": (960, 540),  # Center of screen
            "claim_pet_button": (960, 600),  # Claim button
            "gym_bench_button": (800, 400),  # Gym bench button
            "strength_display": (1200, 300),  # Strength display area
            "pet_equip_slot_1": (500, 700),  # First pet equip slot
            "pet_equip_slot_2": (600, 700),  # Second pet equip slot
            "pet_equip_slot_3": (700, 700),  # Third pet equip slot
        }
        
        print("Pet Simulator 99 Helper Initialized")
        print("Use Ctrl+F1 to start/stop egg hatching")
        print("Use Ctrl+F2 to start/stop pet claiming")
        print("Use Ctrl+F3 to start/stop strength training")
        print("Use Ctrl+F4 to emergency stop all")
        
    def setup_hotkeys(self):
        """Setup keyboard hotkeys for automation control"""
        keyboard.add_hotkey('ctrl+f1', self.toggle_egg_hatching)
        keyboard.add_hotkey('ctrl+f2', self.toggle_pet_claiming)
        keyboard.add_hotkey('ctrl+f3', self.toggle_strength_training)
        keyboard.add_hotkey('ctrl+f4', self.emergency_stop)
        
    def toggle_egg_hatching(self):
        """Toggle automatic egg hatching"""
        self.egg_hatching = not self.egg_hatching
        if self.egg_hatching:
            print("🥚 Auto Egg Hatching: ENABLED")
            threading.Thread(target=self.auto_hatch_eggs, daemon=True).start()
        else:
            print("🥚 Auto Egg Hatching: DISABLED")
            
    def toggle_pet_claiming(self):
        """Toggle automatic pet claiming"""
        self.pet_claiming = not self.pet_claiming
        if self.pet_claiming:
            print("🐾 Auto Pet Claiming: ENABLED")
            threading.Thread(target=self.auto_claim_pets, daemon=True).start()
        else:
            print("🐾 Auto Pet Claiming: DISABLED")
            
    def toggle_strength_training(self):
        """Toggle automatic strength training"""
        self.strength_training = not self.strength_training
        if self.strength_training:
            print("💪 Auto Strength Training: ENABLED")
            threading.Thread(target=self.auto_strength_training, daemon=True).start()
        else:
            print("💪 Auto Strength Training: DISABLED")
            
    def emergency_stop(self):
        """Emergency stop all automation"""
        self.egg_hatching = False
        self.pet_claiming = False
        self.strength_training = False
        print("🚨 EMERGENCY STOP - All automation disabled")
        
    def safe_click(self, position, delay=None):
        """Safely click a position with error handling"""
        try:
            x, y = position
            pyautogui.click(x, y)
            if delay:
                time.sleep(delay)
            else:
                time.sleep(self.config["safety_delay"])
            return True
        except Exception as e:
            print(f"Click error: {e}")
            return False
            
    def auto_hatch_eggs(self):
        """Automatically hatch eggs"""
        print("Starting auto egg hatching...")
        while self.egg_hatching:
            try:
                # Click egg hatch button
                self.safe_click(self.positions["egg_hatch_button"])
                time.sleep(self.config["hatch_interval"])
                
                # Optional: Click claim if pets appear
                self.safe_click(self.positions["claim_pet_button"])
                time.sleep(self.config["safety_delay"])
                
            except Exception as e:
                print(f"Egg hatching error: {e}")
                time.sleep(1)
                
    def auto_claim_pets(self):
        """Automatically claim pets"""
        print("Starting auto pet claiming...")
        while self.pet_claiming:
            try:
                # Click claim pet button
                self.safe_click(self.positions["claim_pet_button"])
                time.sleep(self.config["claim_interval"])
                
            except Exception as e:
                print(f"Pet claiming error: {e}")
                time.sleep(1)
                
    def auto_strength_training(self):
        """Automatically perform strength training"""
        print("Starting auto strength training...")
        while self.strength_training:
            try:
                # Click gym bench button
                self.safe_click(self.positions["gym_bench_button"])
                time.sleep(self.config["training_interval"])
                
                # Wait for cooldown (based on decompiled data)
                time.sleep(2)  # Bench cooldown from code analysis
                
            except Exception as e:
                print(f"Strength training error: {e}")
                time.sleep(1)
                
    def optimize_pet_loadout(self):
        """Help optimize pet loadout based on decompiled knowledge"""
        print("🔥 PET OPTIMIZATION TIPS:")
        print("1. Enable showPetStrength=true in settings")
        print("2. Focus on pets with GetExclusiveLevel() >= 1")
        print("3. Priority order: Rainbow (1000x) > Golden (100x) > Shiny (10x)")
        print("4. Target these pets during events:")
        print("   - Huge VR Robot (Golden + Rainbow + Shiny)")
        print("   - Gym Scorpion (Gym events)")
        print("   - Titanic Sun (Maximum damage)")
        print("5. Use Pet.HiddenItem bonuses when available")
        
    def monitor_game_state(self):
        """Monitor game state and provide optimization suggestions"""
        print("🔍 Game State Monitor Active")
        print("Monitoring for optimization opportunities...")
        
        # This would monitor screen for specific colors/patterns
        # to detect when to switch strategies
        
    def calibrate_positions(self):
        """Help user calibrate screen positions"""
        print("🎯 POSITION CALIBRATION")
        print("Move your mouse to each position and press the corresponding key:")
        print("1 - Egg Hatch Button")
        print("2 - Claim Pet Button") 
        print("3 - Gym Bench Button")
        print("ESC - Finish calibration")
        
        calibrating = True
        while calibrating:
            if keyboard.is_pressed('1'):
                pos = pyautogui.position()
                self.positions["egg_hatch_button"] = pos
                print(f"Egg Hatch Button: {pos}")
                time.sleep(0.5)
                
            elif keyboard.is_pressed('2'):
                pos = pyautogui.position()
                self.positions["claim_pet_button"] = pos
                print(f"Claim Pet Button: {pos}")
                time.sleep(0.5)
                
            elif keyboard.is_pressed('3'):
                pos = pyautogui.position()
                self.positions["gym_bench_button"] = pos
                print(f"Gym Bench Button: {pos}")
                time.sleep(0.5)
                
            elif keyboard.is_pressed('esc'):
                calibrating = False
                print("Calibration complete!")
                
    def save_config(self):
        """Save configuration to file"""
        config_data = {
            "positions": self.positions,
            "config": self.config,
            "timestamp": datetime.now().isoformat()
        }
        
        with open("pet_sim_99_config.json", "w") as f:
            json.dump(config_data, f, indent=2)
        print("Configuration saved!")
        
    def load_config(self):
        """Load configuration from file"""
        try:
            with open("pet_sim_99_config.json", "r") as f:
                config_data = json.load(f)
                self.positions = config_data.get("positions", self.positions)
                self.config = config_data.get("config", self.config)
            print("Configuration loaded!")
        except FileNotFoundError:
            print("No saved configuration found, using defaults")
            
    def run(self):
        """Main run loop"""
        print("🚀 Pet Simulator 99 Helper Starting...")
        print("Make sure Roblox is running and Pet Simulator 99 is active")
        print("Press Ctrl+C to exit")
        
        self.load_config()
        self.setup_hotkeys()
        self.optimize_pet_loadout()
        
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\n👋 Pet Simulator 99 Helper Stopping...")
            self.emergency_stop()
            self.save_config()

def main():
    """Main function"""
    print("=" * 50)
    print("Pet Simulator 99 - Legitimate Automation Helper")
    print("=" * 50)
    print()
    print("IMPORTANT DISCLAIMER:")
    print("This script only automates mouse/keyboard input.")
    print("It does NOT modify game data or cheat in any way.")
    print("Use responsibly and follow Roblox Terms of Service.")
    print()
    
    # Check if user wants to calibrate first
    choice = input("Do you want to calibrate positions first? (y/n): ").lower()
    
    helper = PetSimulator99Helper()
    
    if choice == 'y':
        helper.calibrate_positions()
    
    helper.run()

if __name__ == "__main__":
    main()
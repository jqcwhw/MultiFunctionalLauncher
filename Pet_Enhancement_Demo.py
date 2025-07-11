"""
Pet Enhancement Demo - Interactive Simulation
===========================================

This demo shows exactly how pet enhancement would work with
direct game system access. It simulates the complete enhancement
process with real-time feedback and visual representation.
"""

import os
import time
from Pet_Simulator_99_Enhancement_Simulator import PetEnhancementSystem, Pet, PetRarity, PetVariant

class InteractiveDemo:
    def __init__(self):
        self.system = PetEnhancementSystem()
        self.current_pet = None
        
    def clear_screen(self):
        """Clear the terminal screen"""
        os.system('cls' if os.name == 'nt' else 'clear')
    
    def display_header(self):
        """Display demo header"""
        print("🔥" * 30)
        print("  PET SIMULATOR 99 ENHANCEMENT DEMO")
        print("🔥" * 30)
        print()
    
    def display_menu(self):
        """Display interactive menu"""
        print("📋 Enhancement Options:")
        print("1. Create New Pet")
        print("2. Enhance to Golden (100x)")
        print("3. Enhance to Rainbow (1000x)")
        print("4. Increase Exclusive Level")
        print("5. Unlock Hidden Item")
        print("6. Enable Bypass Ability")
        print("7. Enchant Pet")
        print("8. Create Gym Scorpion")
        print("9. Generate Guaranteed Stronger Pet")
        print("10. Show All Pets")
        print("11. Enable Strength Display")
        print("12. Save & Exit")
        print()
    
    def create_pet_menu(self):
        """Interactive pet creation"""
        print("🐾 Create New Pet")
        print("-" * 20)
        
        name = input("Enter pet name: ").strip()
        if not name:
            name = "Mystery Pet"
        
        print("\nSelect rarity:")
        rarities = list(PetRarity)
        for i, rarity in enumerate(rarities, 1):
            print(f"{i}. {rarity.value}")
        
        try:
            rarity_choice = int(input("Choose rarity (1-9): ")) - 1
            if 0 <= rarity_choice < len(rarities):
                rarity = rarities[rarity_choice]
            else:
                rarity = PetRarity.NORMAL
        except ValueError:
            rarity = PetRarity.NORMAL
        
        print("\nSelect variant:")
        variants = list(PetVariant)
        for i, variant in enumerate(variants, 1):
            print(f"{i}. {variant.value}")
        
        try:
            variant_choice = int(input("Choose variant (1-4): ")) - 1
            if 0 <= variant_choice < len(variants):
                variant = variants[variant_choice]
            else:
                variant = PetVariant.NORMAL
        except ValueError:
            variant = PetVariant.NORMAL
        
        # Create the pet
        pet = self.system.create_pet(name, rarity, variant)
        self.current_pet = pet
        
        print(f"\n✨ Created {pet.name}!")
        self.display_pet_detailed(pet)
        input("\nPress Enter to continue...")
    
    def display_pet_detailed(self, pet: Pet):
        """Display detailed pet information"""
        print(f"\n🐾 {pet.name}")
        print("=" * 30)
        print(f"Rarity: {pet.rarity.value}")
        print(f"Variant: {pet.variant.value}")
        print(f"Power: {pet.current_power:,.2f}")
        print(f"Strength: {pet.current_strength:,.2f}")
        print(f"Exclusive Level: {pet.exclusive_level}")
        print(f"Hidden Item: {'✓' if pet.has_hidden_item else '✗'}")
        print(f"Can Bypass: {'✓' if pet.can_bypass else '✗'}")
        print(f"Is Gargantuan: {'✓' if pet.is_gargantuan else '✗'}")
        print(f"Premium: {'✓' if pet.is_premium else '✗'}")
        print(f"Enchant Level: {pet.enchant_level}")
        
        # Show power breakdown
        print(f"\nPower Breakdown:")
        print(f"  Base Power: {pet.base_power:,.2f}")
        print(f"  Rarity Multiplier: {pet.rarity.value}")
        print(f"  Variant Multiplier: {pet.variant.value}")
        if pet.exclusive_level > 0:
            print(f"  Exclusive Bonus: +{pet.exclusive_level * 50}%")
        if pet.has_hidden_item:
            print(f"  Hidden Item: +100%")
        if pet.can_bypass:
            print(f"  Bypass Bonus: +50%")
        if pet.is_gargantuan:
            print(f"  Gargantuan Bonus: +200%")
    
    def select_pet(self):
        """Select a pet to work with"""
        if not self.system.pets:
            print("❌ No pets available! Create a pet first.")
            return False
        
        print("🐾 Select Pet:")
        for i, pet in enumerate(self.system.pets, 1):
            print(f"{i}. {pet.name} ({pet.rarity.value} {pet.variant.value}) - Power: {pet.current_power:,.2f}")
        
        try:
            choice = int(input("Choose pet: ")) - 1
            if 0 <= choice < len(self.system.pets):
                self.current_pet = self.system.pets[choice]
                return True
            else:
                print("❌ Invalid choice!")
                return False
        except ValueError:
            print("❌ Invalid input!")
            return False
    
    def enhance_to_golden(self):
        """Enhance current pet to golden"""
        if not self.current_pet:
            if not self.select_pet():
                return
        
        print(f"\n🌟 Enhancing {self.current_pet.name} to GOLDEN...")
        old_power = self.current_pet.current_power
        
        if self.system.enhance_pet_to_golden(self.current_pet):
            new_power = self.current_pet.current_power
            increase = new_power - old_power
            print(f"✅ Success! Power increased by {increase:,.2f}")
            print(f"   New power: {new_power:,.2f}")
        else:
            print("❌ Cannot enhance to golden (pet must be normal variant)")
        
        input("\nPress Enter to continue...")
    
    def enhance_to_rainbow(self):
        """Enhance current pet to rainbow"""
        if not self.current_pet:
            if not self.select_pet():
                return
        
        print(f"\n🌈 Enhancing {self.current_pet.name} to RAINBOW...")
        old_power = self.current_pet.current_power
        
        if self.system.enhance_pet_to_rainbow(self.current_pet):
            new_power = self.current_pet.current_power
            increase = new_power - old_power
            print(f"✅ Success! Power increased by {increase:,.2f}")
            print(f"   New power: {new_power:,.2f}")
        else:
            print("❌ Cannot enhance to rainbow (pet must be golden first)")
        
        input("\nPress Enter to continue...")
    
    def increase_exclusive_level(self):
        """Increase pet exclusive level"""
        if not self.current_pet:
            if not self.select_pet():
                return
        
        print(f"\n⭐ Increasing exclusive level for {self.current_pet.name}...")
        old_power = self.current_pet.current_power
        old_level = self.current_pet.exclusive_level
        
        if self.system.increase_exclusive_level(self.current_pet):
            new_power = self.current_pet.current_power
            increase = new_power - old_power
            print(f"✅ Success! Level {old_level} → {self.current_pet.exclusive_level}")
            print(f"   Power increased by {increase:,.2f}")
            print(f"   New power: {new_power:,.2f}")
        else:
            print("❌ Cannot increase level (max level reached)")
        
        input("\nPress Enter to continue...")
    
    def demonstrate_formulas(self):
        """Demonstrate the power calculation formulas"""
        print("\n📊 POWER CALCULATION DEMONSTRATION")
        print("=" * 40)
        
        # Create a test pet
        test_pet = self.system.create_pet("Formula Demo", PetRarity.HUGE, PetVariant.NORMAL)
        
        print(f"Base Pet: {test_pet.current_power:,.2f} power")
        
        # Show each enhancement step
        print("\n🔄 Enhancement Steps:")
        
        # Step 1: Golden
        self.system.enhance_pet_to_golden(test_pet)
        print(f"1. Golden Enhancement: {test_pet.current_power:,.2f} power (+100x)")
        
        # Step 2: Rainbow
        self.system.enhance_pet_to_rainbow(test_pet)
        print(f"2. Rainbow Enhancement: {test_pet.current_power:,.2f} power (+1000x)")
        
        # Step 3: Exclusive Level
        for i in range(5):
            self.system.increase_exclusive_level(test_pet)
        print(f"3. Exclusive Level 5: {test_pet.current_power:,.2f} power (+250%)")
        
        # Step 4: Hidden Item
        self.system.unlock_hidden_item(test_pet)
        print(f"4. Hidden Item: {test_pet.current_power:,.2f} power (+100%)")
        
        # Step 5: Bypass
        self.system.enable_bypass_ability(test_pet)
        print(f"5. Bypass Ability: {test_pet.current_power:,.2f} power (+50%)")
        
        # Step 6: Enchant
        self.system.enchant_pet(test_pet, 10)
        print(f"6. Enchant Level 10: {test_pet.current_power:,.2f} power (+100%)")
        
        print(f"\n🎯 Final Power: {test_pet.current_power:,.2f}")
        print(f"   Power Multiplier: {test_pet.current_power / (test_pet.base_power):,.1f}x")
        
        input("\nPress Enter to continue...")
    
    def show_all_pets(self):
        """Show all pets with their stats"""
        if not self.system.pets:
            print("❌ No pets available!")
            input("\nPress Enter to continue...")
            return
        
        print("\n🐾 ALL PETS")
        print("=" * 50)
        
        for i, pet in enumerate(self.system.pets, 1):
            print(f"{i}. {pet.name}")
            print(f"   {pet.rarity.value} {pet.variant.value}")
            print(f"   Power: {pet.current_power:,.2f}")
            print(f"   Strength: {pet.current_strength:,.2f}")
            print(f"   Exclusive Level: {pet.exclusive_level}")
            print()
        
        # Show best pets
        best_pets = self.system.get_best_pets_by_category()
        if best_pets:
            print("🏆 BEST PETS BY CATEGORY:")
            for category, pet in best_pets.items():
                print(f"   {category}: {pet.name} ({pet.current_power:,.2f})")
        
        input("\nPress Enter to continue...")
    
    def run_demo(self):
        """Run the interactive demo"""
        print("🎮 Starting Pet Enhancement Demo...")
        print("This shows how direct game system access would work.")
        print()
        input("Press Enter to begin...")
        
        while True:
            self.clear_screen()
            self.display_header()
            
            # Show current pet
            if self.current_pet:
                print(f"🎯 Current Pet: {self.current_pet.name}")
                print(f"   Power: {self.current_pet.current_power:,.2f}")
                print(f"   Variant: {self.current_pet.variant.value}")
                print()
            
            self.display_menu()
            
            try:
                choice = int(input("Select option (1-12): "))
                
                if choice == 1:
                    self.create_pet_menu()
                elif choice == 2:
                    self.enhance_to_golden()
                elif choice == 3:
                    self.enhance_to_rainbow()
                elif choice == 4:
                    self.increase_exclusive_level()
                elif choice == 5:
                    if self.current_pet:
                        self.system.unlock_hidden_item(self.current_pet)
                        print("✅ Hidden item unlocked!")
                    else:
                        print("❌ No pet selected!")
                    input("Press Enter to continue...")
                elif choice == 6:
                    if self.current_pet:
                        self.system.enable_bypass_ability(self.current_pet)
                        print("✅ Bypass ability enabled!")
                    else:
                        print("❌ No pet selected!")
                    input("Press Enter to continue...")
                elif choice == 7:
                    if self.current_pet:
                        self.system.enchant_pet(self.current_pet, 1)
                        print("✅ Pet enchanted!")
                    else:
                        print("❌ No pet selected!")
                    input("Press Enter to continue...")
                elif choice == 8:
                    gym_scorpion = self.system.simulate_gym_scorpion_event()
                    self.current_pet = gym_scorpion
                    print("✅ Gym Scorpion obtained!")
                    input("Press Enter to continue...")
                elif choice == 9:
                    if self.system.pets:
                        max_power = max(p.current_power for p in self.system.pets)
                        guaranteed_pet = self.system.simulate_guaranteed_stronger_pet(max_power)
                        self.current_pet = guaranteed_pet
                        print("✅ Guaranteed stronger pet generated!")
                    else:
                        print("❌ Need at least one pet first!")
                    input("Press Enter to continue...")
                elif choice == 10:
                    self.show_all_pets()
                elif choice == 11:
                    self.system.enable_show_pet_strength()
                    print("✅ Pet strength display enabled!")
                    input("Press Enter to continue...")
                elif choice == 12:
                    print("💾 Saving results...")
                    print("👋 Demo complete!")
                    break
                else:
                    print("❌ Invalid choice!")
                    input("Press Enter to continue...")
                    
            except ValueError:
                print("❌ Invalid input!")
                input("Press Enter to continue...")
            except KeyboardInterrupt:
                print("\n👋 Demo interrupted!")
                break

if __name__ == "__main__":
    demo = InteractiveDemo()
    demo.run_demo()
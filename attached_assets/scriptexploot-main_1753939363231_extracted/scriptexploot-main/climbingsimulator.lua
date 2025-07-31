local Library = loadstring(game:HttpGetAsync("https://github.com/ActualMasterOogway/Fluent-Renewed/releases/latest/download/Fluent.luau"))()
local SaveManager = loadstring(game:HttpGetAsync("https://raw.githubusercontent.com/ActualMasterOogway/Fluent-Renewed/master/Addons/SaveManager.luau"))()
local InterfaceManager = loadstring(game:HttpGetAsync("https://raw.githubusercontent.com/ActualMasterOogway/Fluent-Renewed/master/Addons/InterfaceManager.luau"))()
local version = "v0.0.6"

local Window = Library:CreateWindow{
    Title = `Climbing Simulator`,
    SubTitle = `{version} by Edit`,
    TabWidth = 160,
    Size = UDim2.fromOffset(600, 470),
    Resize = true,
    MinSize = Vector2.new(470, 380),
    Acrylic = false, -- blur, bad.
    Theme = "Darker",
    MinimizeKey = Enum.KeyCode.RightControl
}

local Tabs = {
    Main = Window:CreateTab{
        Title = "Main",
        Icon = "phosphor-users-bold"
    },
    Rebirth = Window:CreateTab{
        Title = "Rebirth",
        Icon = "phosphor-rewind-circle"
    },
    Settings = Window:CreateTab {
        Title = "Settings",
        Icon = "settings"
    }
}

local Options = Library.Options

local autoTrainToggle = Tabs.Main:CreateToggle("AutoTrain", {Title = "Auto Train", Default = false })

autoTrainToggle:OnChanged(function()
    local value = Options.AutoTrain.Value
    local running = false

    if value == true and not running then
        running = true

        spawn(function()
            while Options.AutoTrain.Value do
                local args = {
                    [1] = {
                        ["!"] = {
                            [1] = {
                                ["n"] = 0
                            }
                        }
                    },
                [2] = {}
                }

                game:GetService("ReplicatedStorage"):WaitForChild("ReliableRedEvent"):FireServer(unpack(args))
                task.wait(0.2)
            end
            running = false
        end)
    end
end)

Options.AutoTrain:SetValue(false)

local autoWinsToggle = Tabs.Main:CreateToggle("AutoWins", {Title = "Auto Farm Wins", Default = false })

autoWinsToggle:OnChanged(function()
    local value = Options.AutoWins.Value
    local running = false

    if value == true and not running then
        running = true

        spawn(function()
            while Options.AutoWins.Value do
            local args = {
                [1] = {
                    ["$"] = {
                        [1] = {
                            [1] = 4,
                            ["n"] = 1
                        }
                    },
                    ["#"] = {
                        [1] = {
                            [1] = true,
                            ["n"] = 1
                        }
                    },
                    ["\30"] = {
                        [1] = {
                            [1] = true,
                            ["n"] = 1
                        }
                    }
                },
                [2] = {}
            }
            game:GetService("ReplicatedStorage"):WaitForChild("ReliableRedEvent"):FireServer(unpack(args))
            task.wait(0.2)
            end
            running = false
        end)
    end
end)

Options.AutoWins:SetValue(false)

local autoRebirthToggle = Tabs.Rebirth:CreateToggle("AutoRebirth", {Title = "Auto Rebirth", Default = false })

autoRebirthToggle:OnChanged(function()
    local value = Options.AutoRebirth.Value
    local running = false

    if value == true and not running then
        running = true

        spawn(function()
            while Options.AutoRebirth.Value do
            local args = {
                [1] = {
                    ["\21"] = {
                        [1] = {
                            ["n"] = 0
                        }
                    }
                },
                [2] = {}
            }
            game:GetService("ReplicatedStorage"):WaitForChild("ReliableRedEvent"):FireServer(unpack(args))
            task.wait(0.2)
            end
            running = false
        end)
    end
end)

Options.AutoWins:SetValue(false)

local tpToArea = Tabs.Main:CreateDropdown("Area", {
    Title = "Teleport to Area",
    Description = "Teleport to specified area. REQUIRES THE AMOUNT OF WINS.",
    Values = {"Tree", "Cell Tower", "Apartment", "Pyramid", "Eiffel Tower", "Skyscraper", "Volcano", "Waterfall", "Grand Canyon"},
    Multi = false,
    Default = 1,
})

tpToArea:SetValue("Tree")

tpToArea:OnChanged(function(Value)
    local args = {
        [1] = {
            ["\8"] = {
                [1] = {
                    [1] = `{Value}`,
                    ["n"] = 1
                }
            }
        },
    [2] = {}
    }
    game:GetService("ReplicatedStorage"):WaitForChild("ReliableRedEvent"):FireServer(unpack(args))
end)

local AutoBestDumbellToggle = Tabs.Main:CreateToggle("AutoBestDumbell", {Title = "Auto Equip Best Dumbell", Default = false })

AutoBestDumbellToggle:OnChanged(function()
    local value = Options.AutoBestDumbell.Value
    local running = false

    if value == true and not running then
        running = true

        spawn(function()
            while Options.AutoBestDumbell.Value do
                local args = {[1] = {["\""] = {[1] = {[1] = "72000",["n"] = 1}}},[2] = {}}
                game:GetService("ReplicatedStorage"):WaitForChild("ReliableRedEvent"):FireServer(unpack(args))
            task.wait(0.2)
            end
            running = false
        end)
    end
end)

Tabs.Rebirth:CreateButton{
    Title = "Super Rebirth",
    Description = "Super Rebirths",
    Callback = function()
        local args = {
            [1] = {
                ["\22"] = {
                    [1] = {
                        ["n"] = 0
                    }
                }
            },
        [2] = {}
        }

        game:GetService("ReplicatedStorage"):WaitForChild("ReliableRedEvent"):FireServer(unpack(args))
    end
}

local autoSuperRebirthToggle = Tabs.Rebirth:CreateToggle("AutoSuperRebirth", {Title = "Auto SUPER Rebirth", Default = false })

autoSuperRebirthToggle:OnChanged(function()
    local value = Options.AutoSuperRebirth.Value
    local running = false

    if value == true and not running then
        running = true

        spawn(function()
            while Options.AutoSuperRebirth.Value do
            local args = {
                [1] = {
                    ["\22"] = {
                        [1] = {
                            ["n"] = 0
                        }
                    }
                },
                [2] = {}
            }
            game:GetService("ReplicatedStorage"):WaitForChild("ReliableRedEvent"):FireServer(unpack(args))
            task.wait(0.2)
            end
            running = false
        end)
    end
end)

SaveManager:SetLibrary(Library)
InterfaceManager:SetLibrary(Library)

SaveManager:IgnoreThemeSettings()

SaveManager:SetIgnoreIndexes{}

InterfaceManager:SetFolder("edithub")
SaveManager:SetFolder("edithub/climbing-simulator")

InterfaceManager:BuildInterfaceSection(Tabs.Settings)
SaveManager:BuildConfigSection(Tabs.Settings)

Window:SelectTab(1)

Library:Notify {
    Title = "Success",
    Content = "Loaded successfully",
    Duration = 5
}

SaveManager:LoadAutoloadConfig()

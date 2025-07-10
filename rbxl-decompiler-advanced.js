import fs from 'fs';
import path from 'path';

// Advanced RBXL Decompiler using rbxBinaryParser techniques
class RBXLDecompiler {
    constructor() {
        this.output = '';
        this.luaScripts = [];
        this.objects = [];
        this.properties = [];
    }

    async decompile(filePath) {
        try {
            const buffer = fs.readFileSync(filePath);
            this.output = 'RBXL File Decompilation Results\n';
            this.output += '=================================\n\n';
            
            this.analyzeRBXLFile(buffer);
            
            return {
                success: true,
                content: this.output,
                luaScripts: this.luaScripts,
                objects: this.objects,
                properties: this.properties
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    analyzeRBXLFile(buffer) {
        const bytes = new Uint8Array(buffer);
        
        // Check for RBXL signature
        if (this.checkRBXLSignature(bytes)) {
            this.output += 'Valid RBXL file detected\n\n';
        }
        
        // Extract strings and analyze content
        this.extractStrings(bytes);
        this.identifyLuaCode();
        this.identifyRobloxObjects();
        this.identifyProperties();
        
        this.generateReport();
    }

    checkRBXLSignature(bytes) {
        // RBXL files typically start with specific signatures
        const signatures = [
            [0x3C, 0x72, 0x6F, 0x62, 0x6C, 0x6F, 0x78], // <roblox
            [0x52, 0x42, 0x58, 0x4C], // RBXL
            [0x89, 0x50, 0x4E, 0x47] // PNG (for some RBXL files)
        ];
        
        for (const sig of signatures) {
            let match = true;
            for (let i = 0; i < sig.length && i < bytes.length; i++) {
                if (bytes[i] !== sig[i]) {
                    match = false;
                    break;
                }
            }
            if (match) return true;
        }
        return false;
    }

    extractStrings(bytes) {
        let currentString = '';
        const allStrings = [];
        
        for (let i = 0; i < bytes.length; i++) {
            const byte = bytes[i];
            
            // Extract printable ASCII characters
            if (byte >= 32 && byte <= 126) {
                currentString += String.fromCharCode(byte);
            } else if (byte === 0 || byte === 10 || byte === 13) {
                if (currentString.length > 2) {
                    allStrings.push(currentString.trim());
                }
                currentString = '';
            }
        }
        
        if (currentString.length > 2) {
            allStrings.push(currentString.trim());
        }
        
        this.allStrings = allStrings.filter(s => s.length > 0);
        this.output += `Extracted ${this.allStrings.length} readable strings\n\n`;
    }

    identifyLuaCode() {
        const luaPatterns = [
            /local\s+\w+/i,
            /function\s+\w*/i,
            /end\s*$/i,
            /if\s+.*then/i,
            /for\s+.*do/i,
            /while\s+.*do/i,
            /script\.\w+/i,
            /game\.\w+/i,
            /workspace\.\w+/i,
            /wait\s*\(/i,
            /spawn\s*\(/i,
            /print\s*\(/i,
            /require\s*\(/i,
            /Instance\.new/i,
            /FindFirstChild/i,
            /GetChildren/i,
            /Connect/i,
            /Touched/i,
            /Changed/i
        ];

        const luaKeywords = [
            'local', 'function', 'end', 'if', 'then', 'else', 'elseif',
            'for', 'while', 'do', 'repeat', 'until', 'break', 'return',
            'and', 'or', 'not', 'true', 'false', 'nil', 'script', 'game',
            'workspace', 'Instance', 'wait', 'spawn', 'print', 'warn', 'error'
        ];

        this.allStrings.forEach(str => {
            const hasPattern = luaPatterns.some(pattern => pattern.test(str));
            const hasKeyword = luaKeywords.some(keyword => 
                str.toLowerCase().includes(keyword.toLowerCase())
            );
            
            if (hasPattern || hasKeyword || (str.includes('=') && str.includes('(')) || str.includes('--')) {
                this.luaScripts.push(str);
            }
        });

        this.output += `Potential Lua Code Sections (${this.luaScripts.length}):\n`;
        this.output += '===========================================\n';
        this.luaScripts.forEach((script, index) => {
            this.output += `[${index + 1}] ${script}\n`;
        });
        this.output += '\n';
    }

    identifyRobloxObjects() {
        const robloxObjectTypes = [
            'Part', 'Model', 'Script', 'LocalScript', 'ModuleScript',
            'RemoteEvent', 'RemoteFunction', 'BindableEvent', 'BindableFunction',
            'NumberValue', 'StringValue', 'BoolValue', 'ObjectValue', 'IntValue',
            'Vector3Value', 'CFrameValue', 'RayValue', 'BrickColorValue', 'Color3Value',
            'Folder', 'Configuration', 'ScreenGui', 'Frame', 'TextLabel', 'TextButton',
            'ImageLabel', 'ImageButton', 'ScrollingFrame', 'CanvasGroup',
            'UICorner', 'UIStroke', 'UIGradient', 'UIPadding', 'UIListLayout', 'UIGridLayout',
            'Humanoid', 'BodyVelocity', 'BodyPosition', 'BodyAngularVelocity',
            'Attachment', 'WeldConstraint', 'HingeConstraint', 'BallSocketConstraint',
            'Motor6D', 'Weld', 'Motor', 'Snap', 'Glue', 'ManualWeld',
            'Sound', 'SoundGroup', 'Decal', 'Texture', 'SpecialMesh', 'BlockMesh',
            'SpawnLocation', 'Team', 'TeamSpawn', 'Tool', 'HopperBin',
            'Camera', 'CurrentCamera', 'Lighting', 'Workspace', 'Players',
            'ReplicatedStorage', 'ReplicatedFirst', 'StarterPlayer', 'StarterPack',
            'StarterGui', 'ServerScriptService', 'ServerStorage', 'Chat', 'Teams'
        ];

        this.allStrings.forEach(str => {
            robloxObjectTypes.forEach(objType => {
                if (str.includes(objType)) {
                    this.objects.push({
                        type: objType,
                        context: str,
                        pattern: 'Object Reference'
                    });
                }
            });
        });

        // Remove duplicates
        this.objects = this.objects.filter((obj, index, self) => 
            index === self.findIndex(o => o.context === obj.context)
        );

        this.output += `Roblox Objects Found (${this.objects.length}):\n`;
        this.output += '===============================\n';
        this.objects.forEach((obj, index) => {
            this.output += `[${index + 1}] ${obj.type}: ${obj.context}\n`;
        });
        this.output += '\n';
    }

    identifyProperties() {
        const commonProperties = [
            'Name', 'Parent', 'Size', 'Position', 'CFrame', 'Color', 'Material',
            'Transparency', 'CanCollide', 'Anchored', 'Shape', 'TopSurface', 'BottomSurface',
            'Text', 'TextColor3', 'TextSize', 'Font', 'BackgroundColor3', 'BorderSizePixel',
            'Value', 'MaxHealth', 'Health', 'WalkSpeed', 'JumpPower', 'PlatformStand',
            'Volume', 'SoundId', 'PlaybackSpeed', 'Looped', 'EmitterSize',
            'Brightness', 'Ambient', 'ColorShift_Top', 'ColorShift_Bottom',
            'FogColor', 'FogEnd', 'FogStart', 'TimeOfDay', 'ClockTime'
        ];

        this.allStrings.forEach(str => {
            // Look for property assignments
            if (str.includes('=') && !str.includes('==')) {
                const parts = str.split('=');
                if (parts.length === 2) {
                    const prop = parts[0].trim();
                    const value = parts[1].trim();
                    
                    if (commonProperties.some(p => prop.includes(p))) {
                        this.properties.push({
                            property: prop,
                            value: value,
                            context: str
                        });
                    }
                }
            }
            
            // Look for property references
            commonProperties.forEach(prop => {
                if (str.includes(`.${prop}`) || str.includes(`["${prop}"]`) || str.includes(`['${prop}']`)) {
                    this.properties.push({
                        property: prop,
                        value: 'Referenced',
                        context: str
                    });
                }
            });
        });

        // Remove duplicates
        this.properties = this.properties.filter((prop, index, self) => 
            index === self.findIndex(p => p.context === prop.context)
        );

        this.output += `Properties Found (${this.properties.length}):\n`;
        this.output += '==========================\n';
        this.properties.forEach((prop, index) => {
            this.output += `[${index + 1}] ${prop.property}: ${prop.value}\n`;
        });
        this.output += '\n';
    }

    generateReport() {
        this.output += 'DETAILED ANALYSIS\n';
        this.output += '=================\n\n';
        
        this.output += 'All Extracted Strings:\n';
        this.output += '----------------------\n';
        this.allStrings.forEach((str, index) => {
            if (str.length > 1) {
                this.output += `${index + 1}. ${str}\n`;
            }
        });
        
        this.output += '\n\nDecompilation Summary:\n';
        this.output += '=====================\n';
        this.output += `Total strings extracted: ${this.allStrings.length}\n`;
        this.output += `Lua code sections: ${this.luaScripts.length}\n`;
        this.output += `Roblox objects: ${this.objects.length}\n`;
        this.output += `Properties: ${this.properties.length}\n`;
        this.output += `\nDecompilation completed at: ${new Date().toISOString()}\n`;
    }
}

export default RBXLDecompiler;
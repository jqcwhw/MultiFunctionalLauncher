import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Configure multer for file uploads
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB limit
    }
});

// Serve static files
app.use(express.static('.'));

// Serve the decompiler interface
app.get('/rbxl-decompiler', (req, res) => {
    res.sendFile(path.join(__dirname, 'rbxl-decompiler.html'));
});

// Handle RBXL file uploads
app.post('/api/decompile', upload.single('rbxlFile'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = req.file.path;
        const buffer = fs.readFileSync(filePath);
        
        // Basic RBXL decompilation
        const decompiled = decompileRBXLBuffer(buffer);
        
        // Clean up uploaded file
        fs.unlinkSync(filePath);
        
        res.json({
            success: true,
            content: decompiled,
            filename: req.file.originalname
        });
        
    } catch (error) {
        console.error('Decompilation error:', error);
        res.status(500).json({ error: 'Failed to decompile RBXL file' });
    }
});

function decompileRBXLBuffer(buffer) {
    try {
        let content = '';
        let structuredContent = 'RBXL File Analysis\n';
        structuredContent += '===================\n\n';
        
        // Extract readable strings
        const bytes = new Uint8Array(buffer);
        let currentString = '';
        let allStrings = [];
        
        for (let i = 0; i < bytes.length; i++) {
            const byte = bytes[i];
            
            // Check if byte is printable ASCII
            if (byte >= 32 && byte <= 126) {
                currentString += String.fromCharCode(byte);
            } else {
                if (currentString.length > 3) {
                    allStrings.push(currentString);
                    content += currentString + '\n';
                }
                currentString = '';
            }
        }
        
        // Look for Lua code patterns
        let luaCode = '';
        const luaKeywords = [
            'local', 'function', 'end', 'if', 'then', 'else', 'for', 'while', 'do',
            'script', 'game', 'workspace', 'Instance', 'new', 'FindFirstChild',
            'GetChildren', 'Connect', 'Touched', 'Changed', 'Humanoid', 'Character',
            'Player', 'Players', 'ReplicatedStorage', 'StarterPlayer', 'StarterPack',
            'Lighting', 'SoundService', 'TweenService', 'RunService', 'UserInputService',
            'wait', 'print', 'warn', 'error', 'pairs', 'ipairs', 'spawn'
        ];
        
        allStrings.forEach(str => {
            const hasLuaKeywords = luaKeywords.some(keyword => 
                str.toLowerCase().includes(keyword.toLowerCase())
            );
            
            if (hasLuaKeywords || str.includes('=') || str.includes('()') || str.includes('{}')) {
                luaCode += str + '\n';
            }
        });
        
        structuredContent += 'Extracted Lua Code:\n';
        structuredContent += '==================\n';
        structuredContent += luaCode + '\n\n';
        
        structuredContent += 'Raw Strings Found:\n';
        structuredContent += '==================\n';
        structuredContent += content;
        
        // Look for common Roblox patterns
        const patterns = [
            /Part\d*/g,
            /Model\d*/g,
            /Script\d*/g,
            /LocalScript\d*/g,
            /RemoteEvent\d*/g,
            /RemoteFunction\d*/g,
            /NumberValue\d*/g,
            /StringValue\d*/g,
            /BoolValue\d*/g,
            /ObjectValue\d*/g,
            /IntValue\d*/g
        ];
        
        let objectsFound = '\n\nRoblox Objects Found:\n';
        objectsFound += '====================\n';
        
        patterns.forEach(pattern => {
            const matches = content.match(pattern);
            if (matches) {
                matches.forEach(match => {
                    objectsFound += match + '\n';
                });
            }
        });
        
        structuredContent += objectsFound;
        
        return structuredContent;
        
    } catch (error) {
        throw new Error('Failed to parse RBXL file: ' + error.message);
    }
}

app.listen(PORT, () => {
    console.log(`RBXL Decompiler server running on http://localhost:${PORT}`);
    console.log(`Access the decompiler at: http://localhost:${PORT}/rbxl-decompiler`);
});
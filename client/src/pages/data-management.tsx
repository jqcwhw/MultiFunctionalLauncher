
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, Database, FileText, HardDrive } from "lucide-react";

export default function DataManagement() {
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [bulkData, setBulkData] = useState<string>('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const { toast } = useToast();

  const tables = [
    'accounts',
    'instances',
    'activity_logs',
    'settings',
    'ps99_pets',
    'ps99_scraped_data',
    'ps99_action_recordings',
    'ps99_coordinate_recordings',
    'ps99_api_data'
  ];

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const response = await fetch('/api/files');
      if (response.ok) {
        const fileList = await response.json();
        setFiles(fileList);
      }
    } catch (error) {
      console.error('Failed to load files:', error);
    }
  };

  const handleFileUpload = async () => {
    if (!uploadFile) {
      toast({ title: "No file selected", variant: "destructive" });
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        const response = await fetch('/api/files/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: uploadFile.name,
            content: content,
            contentType: uploadFile.type
          })
        });

        if (response.ok) {
          toast({ title: "File uploaded successfully" });
          setUploadFile(null);
          loadFiles();
        } else {
          toast({ title: "Upload failed", variant: "destructive" });
        }
      };
      reader.readAsDataURL(uploadFile);
    } catch (error) {
      toast({ title: "Upload failed", variant: "destructive" });
    }
  };

  const handleBulkInsert = async () => {
    if (!selectedTable || !bulkData) {
      toast({ title: "Please select table and provide data", variant: "destructive" });
      return;
    }

    try {
      const data = JSON.parse(bulkData);
      const response = await fetch(`/api/data/bulk/${selectedTable}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      });

      if (response.ok) {
        const result = await response.json();
        toast({ title: `${result.count} records stored successfully` });
        setBulkData('');
      } else {
        toast({ title: "Bulk insert failed", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Invalid JSON data", variant: "destructive" });
    }
  };

  const handleExport = async () => {
    if (!selectedTable) {
      toast({ title: "Please select a table", variant: "destructive" });
      return;
    }

    try {
      const response = await fetch(`/api/data/export/${selectedTable}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedTable}_export.json`;
        a.click();
        window.URL.revokeObjectURL(url);
        toast({ title: "Export completed successfully" });
      } else {
        toast({ title: "Export failed", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Export failed", variant: "destructive" });
    }
  };

  const handleBackup = async () => {
    try {
      const response = await fetch('/api/database/backup');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `database_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        window.URL.revokeObjectURL(url);
        toast({ title: "Database backup completed" });
      } else {
        toast({ title: "Backup failed", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Backup failed", variant: "destructive" });
    }
  };

  const handleRestore = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const backup = e.target?.result as string;
          try {
            const response = await fetch('/api/database/restore', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ backup })
            });

            if (response.ok) {
              toast({ title: "Database restored successfully" });
            } else {
              toast({ title: "Restore failed", variant: "destructive" });
            }
          } catch (error) {
            toast({ title: "Restore failed", variant: "destructive" });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const downloadFile = async (id: string, filename: string) => {
    try {
      const response = await fetch(`/api/files/${id}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      toast({ title: "Download failed", variant: "destructive" });
    }
  };

  const deleteFile = async (id: string) => {
    try {
      const response = await fetch(`/api/files/${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast({ title: "File deleted successfully" });
        loadFiles();
      } else {
        toast({ title: "Delete failed", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Management</h1>
        <p className="text-muted-foreground">Manage your database and files</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              File Upload
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="file">Select File</Label>
              <Input
                id="file"
                type="file"
                onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              />
            </div>
            <Button onClick={handleFileUpload} disabled={!uploadFile}>
              Upload File
            </Button>
          </CardContent>
        </Card>

        {/* Database Operations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Operations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleBackup} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Backup Database
            </Button>
            <Button onClick={handleRestore} className="w-full" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Restore Database
            </Button>
          </CardContent>
        </Card>

        {/* Bulk Data Operations */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              Bulk Data Operations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="table">Select Table</Label>
                <Select value={selectedTable} onValueChange={setSelectedTable}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select table" />
                  </SelectTrigger>
                  <SelectContent>
                    {tables.map(table => (
                      <SelectItem key={table} value={table}>
                        {table}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 items-end">
                <Button onClick={handleExport} disabled={!selectedTable}>
                  Export Data
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="bulk-data">JSON Data (for bulk insert)</Label>
              <Textarea
                id="bulk-data"
                placeholder="Enter JSON array of objects..."
                value={bulkData}
                onChange={(e) => setBulkData(e.target.value)}
                rows={8}
              />
            </div>
            
            <Button onClick={handleBulkInsert} disabled={!selectedTable || !bulkData}>
              Bulk Insert Data
            </Button>
          </CardContent>
        </Card>

        {/* File Manager */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              File Manager
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {files.length === 0 ? (
                <p className="text-muted-foreground">No files uploaded</p>
              ) : (
                files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <span className="font-medium">{file.filename}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <div className="space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadFile(file.id, file.filename)}
                      >
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteFile(file.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

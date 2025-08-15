# 移除项目中所有TypeScript和JavaScript文件的分号
Write-Host "开始移除项目中的分号..." -ForegroundColor Green

# 获取所有TypeScript和JavaScript文件
$files = Get-ChildItem -Path "src" -Recurse -Include "*.ts", "*.tsx", "*.js", "*.jsx"

$totalFiles = $files.Count
$processedFiles = 0

foreach ($file in $files) {
    try {
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
        
        # 移除分号（但保留字符串中的分号）
        # 使用正则表达式来匹配行末的分号，但排除字符串中的分号
        $newContent = $content -replace '([^"'';])\s*;\s*$', '$1' -replace '([^"'';])\s*;\s*\n', '$1' -replace '([^"'';])\s*;\s*\r\n', '$1'
        
        # 移除import语句末尾的分号
        $newContent = $newContent -replace 'import\s+.*?;\s*$', { $args[0] -replace ';$', '' } -replace 'import\s+.*?;\s*\n', { $args[0] -replace ';$', '' } -replace 'import\s+.*?;\s*\r\n', { $args[0] -replace ';$', '' }
        
        # 移除export语句末尾的分号
        $newContent = $newContent -replace 'export\s+.*?;\s*$', { $args[0] -replace ';$', '' } -replace 'export\s+.*?;\s*\n', { $args[0] -replace ';$', '' } -replace 'export\s+.*?;\s*\r\n', { $args[0] -replace ';$', '' }
        
        # 移除变量声明和函数调用末尾的分号
        $newContent = $newContent -replace '(\w+\s*=\s*[^;]+);\s*$', '$1' -replace '(\w+\s*=\s*[^;]+);\s*\n', '$1' -replace '(\w+\s*=\s*[^;]+);\s*\r\n', '$1'
        
        # 移除return语句末尾的分号
        $newContent = $newContent -replace 'return\s+[^;]+;\s*$', { $args[0] -replace ';$', '' } -replace 'return\s+[^;]+;\s*\n', { $args[0] -replace ';$', '' } -replace 'return\s+[^;]+;\s*\r\n', { $args[0] -replace ';$', '' }
        
        # 如果内容有变化，写入文件
        if ($content -ne $newContent) {
            Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
            Write-Host "已处理: $($file.Name)" -ForegroundColor Yellow
        }
        
        $processedFiles++
        Write-Progress -Activity "移除分号" -Status "处理文件 $processedFiles/$totalFiles" -PercentComplete (($processedFiles / $totalFiles) * 100)
        
    } catch {
        Write-Host "处理文件 $($file.Name) 时出错: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Progress -Activity "移除分号" -Completed
Write-Host "完成！已处理 $processedFiles 个文件" -ForegroundColor Green

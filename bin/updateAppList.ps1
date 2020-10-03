# 将bucket文件夹下的json文件提取出文件名和version到app-list.json中

$appListPath = "../app-list.json"
$backetPath = "../bucket"

if (!(Test-Path $backetPath)) {
    Write-Warning "'$backetPath' directory can not find"
    exit 0
}

if ((Test-Path $appListPath)) {
    Remove-Item -Path $appListPath -Force
}

New-Item -Path $appListPath | Out-Null

[hashtable]$json = @{}

$files = Get-ChildItem $backetPath/*.json -Depth 3 | Select-Object name,BaseName,FullName

ForEach ($file in $files) {
    $version = Get-Content $file.FullName | ConvertFrom-Json | Select-Object -ExpandProperty version
    $json[$file.BaseName] = [string]$version
}

$json | ConvertTo-Json | Out-File $appListPath


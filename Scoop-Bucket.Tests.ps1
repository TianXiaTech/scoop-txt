# $validator = New-Object Scoop.Validator("$PSScriptRoot/../schema.json", $true)
if (!$env:SCOOP_HOME) { $env:SCOOP_HOME = Resolve-Path (scoop prefix scoop) }

# # Change the test file's scheme json postion
$dest = "$env:SCOOP_HOME\test\Import-Bucket-Tests.ps1"
$importBucketTests = Get-Content $dest
$sourcePath = '"\$PSScriptRoot\/\.\.\/schema\.json"'
$newPath = Convert-Path "$PSScriptRoot/schema.json"
$importBucketTests = $importBucketTests -replace $sourcePath, "`"$newPath`""
$importBucketTests | Out-File -Encoding UTF8 $dest

. "$env:SCOOP_HOME\test\Import-Bucket-Tests.ps1"

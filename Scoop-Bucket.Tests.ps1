if (!$env:SCOOP_HOME) { $env:SCOOP_HOME = Resolve-Path (scoop prefix scoop) }
function Get-GitChangedFile {
  param(
    [string] $Path,
    [string] $Commit,
    [string[]] $Include
  )

  $bucketPath = [IO.Path]::GetFullPath($Path).TrimEnd('\')
  & BuildHelpers\Get-GitChangedFile -Path $Path -Commit $Commit -Include $Include |
    Where-Object {
      $filePath = [IO.Path]::GetFullPath($_)
      $filePath.StartsWith("$bucketPath\", [StringComparison]::OrdinalIgnoreCase)
    }
}
. "$env:SCOOP_HOME\test\Import-Bucket-Tests.ps1" -BucketPath "$PSScriptRoot/bucket"

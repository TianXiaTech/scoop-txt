# scoop-txt

[Scoop](https://scoop.sh/)是一款强大的Windows命令行包管理工具，[Scoop仓库地址](https://github.com/lukesampson/scoop)

## 安装Scoop

### 系统环境要求

1. PowerShell 5以上, 查看命令:
    ``` powershell
    $PSVersionTable
    ```
2. .NET Framework 4.5或更高版本, 查看命令:
    ``` powershell
    (Get-ItemProperty "HKLM:SOFTWARE\Microsoft\NET Framework Setup\NDP\v4\Full").Release -ge 378389
    ```

### 安装命令

``` powershell
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')

# 简短方式安装
iwr -useb get.scoop.sh | iex

```

### 特别说明

如果出现脚本无法执行的报错信息，请修改执行策略: `Set-ExecutionPolicy RemoteSigned -scope CurrentUser`

## scoop-txt

scoop-txt源主要包含国内热门的应用程序，添加scoop-txt源到scoop:
``` powershell
scoop bucket add scoop-txt https://github.com/TianXiaTech/scoop-txt.git
```

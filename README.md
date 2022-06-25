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

[查看更多](https://github.com/ScoopInstaller/Install)

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
scoop bucket add txt https://github.com/TianXiaTech/scoop-txt.git
```
安装应用:
``` powershell
scoop install weixin
# or
scoop install txt/weixin
```

遇到版本为 `nightly-20210820` 这类的，更新方式为 `scoop update <App Name> -f`

## 常见问题

执行 `scoop update` 出现以下问题，先移除 txt `scoop bucket rm txt`，然后再重新添加到 bucket 中，`scoop bucket add txt https://github.com/TianXiaTech/scoop-txt.git`

```bash
Updating 'txt' bucket...
Your configuration specifies to merge with the ref 'refs/heads/main'
from the remote, but no such ref was fetched.
```

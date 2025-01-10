// 常规脚本大集合
// 项目目录结构检查脚本
// 关注我X https://x.com/biggor888
// 使用方法，在项目目录下执行 node list-files.js
// 请确认已经具备 nodejs 环境
// 编写日期 202501102112

const fs = require('fs');
const path = require('path');

function listFiles(dir, excludes = ['node_modules', '.git', '.next', 'dist']) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const relativePath = path.relative(process.cwd(), filePath);
        const stat = fs.statSync(filePath);
        
        if (excludes.some(ex => filePath.includes(ex))) {
            return;
        }
        
        if (stat.isDirectory()) {
            listFiles(filePath, excludes);
        } else {
            console.log(relativePath.replace(/\\/g, '/'));
        }
    });
}

console.log('项目文件结构：\n');
listFiles('.');

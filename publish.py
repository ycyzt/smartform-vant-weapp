import os
import sys
import json

# 执行命令函数
def execCmd(cmd):
    r = os.popen(cmd)
    text = r.read()
    r.close()
    return text


# 执行npm run build
def build():
    print('build start')
    os.system('npm run build')
    print('build end')

# 读取package.json,使version+1
def addVersion():
    print('add version start')
    with open('package.json', 'r') as f:
        data = f.read()
        data = eval(data)
        version = data['version']
        version = version.split('.')
        version[-1] = str(int(version[-1]) + 1)
        version = '.'.join(version)
        data['version'] = version
        with open('package.json', 'w') as f:
            f.write(json.dumps(data, indent=2))
        print('add version end')


# 发布到npm
def publish():
    print('publish start')
    os.system('npm publish')
    print('publish end')


# 执行所有步骤
build()
addVersion()
publish()



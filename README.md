# prop
微信传播工具

# 目录结构

- css/
- less/(开发使用less，生成到根目录css目录下)
- img/
- js/
    - appPart/（独立模块，以app名字开头，各app模块内容近似）
        - controller/（相关的子模板的controller.js存放在这里）
        - directives/ (相关的directive.js存放在这里)
        - part_app.js (app模型定义和路由配置文件)
        - part_main.js (requirejs的入口和配置文件)
        - part_services.js (app的相关服务配置文件)
    - common/ (通用模块库)
    - utils/ (其他组件)
- lib/ (包含所有第三方类库)
- templete/ (子模板文件夹，其内容按模块类型分类)
- index.html (程序的总入口点，用以根据配置跳转到各个模块入口)
- part.html (admin模块的入口html)
- resource/（TODO 无后台服务时暂用的资源目录，比如图片，背景音乐等等）
    - img/ （上传的图片）
    - sound/（背景音乐）
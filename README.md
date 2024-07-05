# Beeboat-Parser 新一代蜂舟解析器
组件库使用的是基于element-plus最新版本进行重构的beeboat-plus。
新一代蜂舟设计器不会生成代码，对于有重写需求的功能，可以重写逻辑和页面。
### 项目结构

```
├── README.md
├── build
│   └── plugin.ts
├── src
│   ├── beeboat-plus
│   │   └── view
│   │       └── bt-view.vue
│   ├── types
│   ├── views
│   │   └── _template
│   │       ├── xxxx.ts
│   │       └── xxxx.vue
│   │   └── register.ts
│   └── styles
│   │   └── index.scss
│   ├── App.vue
│   └── main.ts
├── public
│   └── config
│       └── globalconfig.json
│   └── favicon.ico
└── package.json
```

### 目录说明

- build：用于构建组件库，无需修改
- src: 
- src/beeboat-plus：无需修改
- src/types：无需修改
- src/views：**无法通过设计器生成的页面，可以在此处新建目录，并在 register.ts 中注册**,可以只重写逻辑，也可以重写逻辑和页面
- src/views/_template：模板，可以直接复制进行开发
- src/styles：公共样式文件，如需自定义样式可以在此修改
- public/config：配置文件，需要和.env文件对应
- public/favicon.ico：网站图标
- package.json：项目配置文件
- Dockerfile：docker配置文件，**需要根据模块名修改**

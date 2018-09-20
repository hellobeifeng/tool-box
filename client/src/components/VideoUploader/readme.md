# 视频分片上传

文档描述了视频文件分片上传模块的设计及实现


## 一、使用方法简介

	// 引入模块
	const VideoUpload = require('VideoUpload.js')

	// 将上传文件对象作为参数实例化上传模块
	let videoUpload = new VideoUpload(file) // 触发上传

	// 监听事件
	videoUpload.on('ready',data => {})		// 格式校验通过等，触发开始上传事件
	videoUpload.on('uploading',data => {}) 	// 视频文件分片的某一片上传成功，触发分片上传事件
	videoUpload.on('success',data => {}) 	// 所有分片上传成功，触发上传成功事件
	videoUpload.on('error',error => {}) 	// 过程中任何异常，都会触发 error 事件，中止上传

	// 开始执行上传
	videoUpload.init()

    // 注册了事件之后，开始执行上传文件操作，模块会在特定时机触发已注册的事件
	videoUpload.cancel() // 取消视频上传

## 二、VideoUpload 类

完成对视频信息的校验，对外提供方法或事件监听，完成视频上传。

### 2.1 Constructor

- file  必填
    通过`input` 表单上传元素按钮获取的 FileList 对象的一个元素（文件）
- { options }  可选

    实例化时传入的模块配置对象，实例化时传入的同名参数会覆盖默认配置，反之则使用默认配置

        {
            fileSizeLimit: 500 * 1024 * 1024,   // 默认上传视频大小限制为 500 M
            durationLimit: 30 * 60,             // 默认播放时长限制为 30 分钟
            bytesPerPiece: 10 * 1024 * 1024,    // 默认视频每片的切片大小为 10M
            mode: [1]                             // 是否需要严格校验  0 不需要  1  需要
        }

### 2.2 静态Methods

- cancel 取消上传

    调用这个方法后，会清空当前对象的内部属性，比如上传进度，上传体积，剩余时间，同时清空已注册事件队列。防止上传中途点击取消后，还会接收到后续的网络请求事件


### 2.3 Events
下列事件，一般遵循如下的时间线：开始上传 - 分片上传 - 上传完成。任何一步出错都会抛出异常，结束上传过程。

#### 2.3.1 开始上传事件 ready

说明：视频校验通过，并且调用后台接口的“开始上传”成功后触发
回调第一个参数：Object，具体属性如下

| key | 描述 |
| :--: | :--: |
| filename | 文件名 |
| size |文件大小 |
| fileVideoWidth | 视频宽 或 undefined |
| fileVideoHeight | 视频高 或 undefined |
| duration | 视频时长 (单位s) |


### 2.3.2 某一分片上传成功事件 uploading
说明：某一分片上传成功之后，上传模块会触发这个事件，同时将当前的上传进度相关信息发送给事件监听者。回调第一个参数：Object，具体如下

|key|描述|
|:--:|:--:|
|progress|上传进度，数字（0-100），已上传分片数/总分片数|
|uploaded|已上传文件大小|
|size|文件总大小|
|filename|文件名|
|remaining|剩余上传时间|
|duration|视频文件时常|

### 2.3.3 所有分片上传成功事件 success

说明：所有分片上传完成时触发


|key|描述|
|:--:|:--:|
|fileid|文件ID|


#### 2.3.4 异常事件 error

说明：视频校验失败或（任一分片）文件上传失败失败时触发
回调第一个参数：Object，具体如下

|key|描述|
|:--:|:--:|
|code| 错误码|
|msg|错误消息|

code 枚举值如下

| code| 说明 |
| --- | --- |
| A00001 | 视频校验失败 |
| A00002 | 网络错误 |

## 三、TODO
- 使用各类设计模式改造代码：单例、工厂、策略、装饰器等
- 对分片增加 md5 值
- 客户端断点重试
- 拆分设计结构 分离成: 视频校验 + 视频上传 两部分

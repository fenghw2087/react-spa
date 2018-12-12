
参数传递方式

1.页面使用了react-router 4.0 的 hashRouter
  
  在route的path里配置最后一个参数为接受参数，所有跳转的参数，以base64的格式塞在这个参数里。
  调用objexbase64里的两个方法，进行参数加解密。
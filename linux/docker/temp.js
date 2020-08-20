docker 打包操作命令

scp -r dist/ root@30.23.18.242:/opt/web-docker/common  //上传本地代码

ssh-copy-id root@30.23.18.242 //绑定密码

sh del.sh  // 删除命令  =》 del.sh 文件里写的命令  rm -rf ./dist  强制删除同层下的dist文件夹

ssh root@30.23.18.242 //进入服务器

cd /opt/web-docker/common // 切换到文件夹

df -h // 查看镜像状态

docker build -t 30.23.18.178:80/smartpaas-web:v1.2.1-20200728-B01 .    // 打镜像

docker push 30.23.18.178:80/smartpaas-web:v1.2.1-20200728-B01   // 推送镜像
cmd_Release/obj.target/apns.node := g++ -shared -pthread -rdynamic -m64  -Wl,-soname=apns.node -o Release/obj.target/apns.node -Wl,--start-group Release/obj.target/apns/apns.o Release/obj.target/apns/h2.o Release/obj.target/apns/log.o -Wl,--end-group /usr/local/lib/libnghttp2.a
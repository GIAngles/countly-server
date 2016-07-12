cmd_Release/obj.target/apns/apns.o := g++ '-DNODE_GYP_MODULE_NAME=apns' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-DBUILDING_NODE_EXTENSION' -I/home/misaru/.node-gyp/5.12.0/include/node -I/home/misaru/.node-gyp/5.12.0/src -I/home/misaru/.node-gyp/5.12.0/deps/uv/include -I/home/misaru/.node-gyp/5.12.0/deps/v8/include -I../node_modules/nan  -fPIC -pthread -Wall -Wextra -Wno-unused-parameter -m64 -O3 -fno-omit-frame-pointer -fno-rtti -std=gnu++0x -MMD -MF ./Release/.deps/Release/obj.target/apns/apns.o.d.raw   -c -o Release/obj.target/apns/apns.o ../apns.cc
Release/obj.target/apns/apns.o: ../apns.cc ../node_modules/nan/nan.h \
 /home/misaru/.node-gyp/5.12.0/include/node/node_version.h \
 /home/misaru/.node-gyp/5.12.0/include/node/uv.h \
 /home/misaru/.node-gyp/5.12.0/include/node/uv-errno.h \
 /home/misaru/.node-gyp/5.12.0/include/node/uv-version.h \
 /home/misaru/.node-gyp/5.12.0/include/node/uv-unix.h \
 /home/misaru/.node-gyp/5.12.0/include/node/uv-threadpool.h \
 /home/misaru/.node-gyp/5.12.0/include/node/uv-linux.h \
 /home/misaru/.node-gyp/5.12.0/include/node/node.h \
 /home/misaru/.node-gyp/5.12.0/include/node/v8.h \
 /home/misaru/.node-gyp/5.12.0/include/node/v8-version.h \
 /home/misaru/.node-gyp/5.12.0/include/node/v8config.h \
 /home/misaru/.node-gyp/5.12.0/include/node/node_version.h \
 /home/misaru/.node-gyp/5.12.0/include/node/node_buffer.h \
 /home/misaru/.node-gyp/5.12.0/include/node/node.h \
 /home/misaru/.node-gyp/5.12.0/include/node/node_object_wrap.h \
 ../node_modules/nan/nan_callbacks.h \
 ../node_modules/nan/nan_callbacks_12_inl.h \
 ../node_modules/nan/nan_maybe_43_inl.h \
 ../node_modules/nan/nan_converters.h \
 ../node_modules/nan/nan_converters_43_inl.h \
 ../node_modules/nan/nan_new.h \
 ../node_modules/nan/nan_implementation_12_inl.h \
 ../node_modules/nan/nan_persistent_12_inl.h \
 ../node_modules/nan/nan_weak.h ../node_modules/nan/nan_object_wrap.h \
 ../node_modules/nan/nan_typedarray_contents.h ../h2.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/err.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/e_os2.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/opensslconf.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/./archs/linux-x86_64/opensslconf.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/ossl_typ.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/bio.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/crypto.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/stack.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/safestack.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/opensslv.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/symhacks.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/lhash.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/conf.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/pem.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/evp.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/objects.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/obj_mac.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/asn1.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/bn.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/x509.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/buffer.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/ec.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/ecdsa.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/ecdh.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/rsa.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/dsa.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/dh.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/sha.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/x509_vfy.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/pkcs7.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/pem2.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/pkcs12.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/ssl.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/comp.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/hmac.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/kssl.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/ssl2.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/ssl3.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/tls1.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/dtls1.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/pqueue.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/ssl23.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/srtp.h \
 /home/misaru/.node-gyp/5.12.0/include/node/openssl/x509v3.h
../apns.cc:
../node_modules/nan/nan.h:
/home/misaru/.node-gyp/5.12.0/include/node/node_version.h:
/home/misaru/.node-gyp/5.12.0/include/node/uv.h:
/home/misaru/.node-gyp/5.12.0/include/node/uv-errno.h:
/home/misaru/.node-gyp/5.12.0/include/node/uv-version.h:
/home/misaru/.node-gyp/5.12.0/include/node/uv-unix.h:
/home/misaru/.node-gyp/5.12.0/include/node/uv-threadpool.h:
/home/misaru/.node-gyp/5.12.0/include/node/uv-linux.h:
/home/misaru/.node-gyp/5.12.0/include/node/node.h:
/home/misaru/.node-gyp/5.12.0/include/node/v8.h:
/home/misaru/.node-gyp/5.12.0/include/node/v8-version.h:
/home/misaru/.node-gyp/5.12.0/include/node/v8config.h:
/home/misaru/.node-gyp/5.12.0/include/node/node_version.h:
/home/misaru/.node-gyp/5.12.0/include/node/node_buffer.h:
/home/misaru/.node-gyp/5.12.0/include/node/node.h:
/home/misaru/.node-gyp/5.12.0/include/node/node_object_wrap.h:
../node_modules/nan/nan_callbacks.h:
../node_modules/nan/nan_callbacks_12_inl.h:
../node_modules/nan/nan_maybe_43_inl.h:
../node_modules/nan/nan_converters.h:
../node_modules/nan/nan_converters_43_inl.h:
../node_modules/nan/nan_new.h:
../node_modules/nan/nan_implementation_12_inl.h:
../node_modules/nan/nan_persistent_12_inl.h:
../node_modules/nan/nan_weak.h:
../node_modules/nan/nan_object_wrap.h:
../node_modules/nan/nan_typedarray_contents.h:
../h2.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/err.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/e_os2.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/opensslconf.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/./archs/linux-x86_64/opensslconf.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/ossl_typ.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/bio.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/crypto.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/stack.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/safestack.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/opensslv.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/symhacks.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/lhash.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/conf.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/pem.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/evp.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/objects.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/obj_mac.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/asn1.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/bn.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/x509.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/buffer.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/ec.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/ecdsa.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/ecdh.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/rsa.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/dsa.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/dh.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/sha.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/x509_vfy.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/pkcs7.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/pem2.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/pkcs12.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/ssl.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/comp.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/hmac.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/kssl.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/ssl2.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/ssl3.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/tls1.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/dtls1.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/pqueue.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/ssl23.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/srtp.h:
/home/misaru/.node-gyp/5.12.0/include/node/openssl/x509v3.h:

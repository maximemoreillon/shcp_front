#!/bin/sh

ROOT_DIR=/app

VUE_APP_SHCP_API_URLX=https://api.shcp.maximemoreillon.com
VUE_APP_AUTHENTICATION_API_URLX=https://api.authentication.maximemoreillon.com
VUE_APP_AUTHENTICATION_FRONT_URLX=https://authentication.maximemoreillon.com

# Replace env vars in files served by NGINX
echo "Replacing environment variables"
for file in $ROOT_DIR/js/*.js* $ROOT_DIR/index.html $ROOT_DIR/precache-manifest*.js;
do
  echo "Processing $file ...";

  sed -i 's|VUE_APP_SHCP_API_URL|'${VUE_APP_SHCP_API_URLX}'|g' $file
  sed -i 's|VUE_APP_AUTHENTICATION_API_URL|'${VUE_APP_AUTHENTICATION_API_URLX}'|g' $file
  sed -i 's|VUE_APP_AUTHENTICATION_FRONT_URL|'${VUE_APP_AUTHENTICATION_FRONT_URLX}'|g' $file

done

echo "Starting Nginx"
nginx -g 'daemon off;'

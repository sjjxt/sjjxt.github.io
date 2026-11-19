FROM public.ecr.aws/docker/library/nginx:stable-alpine-slim

WORKDIR /www
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY dist/ ./
RUN test -s index.html && test -s 404.html && test -s pagefind/pagefind-entry.json

USER nginx
EXPOSE 8080
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]

FROM squidfunk/mkdocs-material:9.7

#RUN pip install mkdocs-macros-plugin
RUN pip install mkdocs-video
RUN pip install mkdocs-awesome-nav

# Install NPM
RUN apk upgrade --update-cache -a && apk add --no-cache curl bash npm && apk cache clean --purge
RUN mkdir /.npm && chown -R 1000:1000 "/.npm"
RUN npm i -g @adobe/jsonschema2md
RUN echo "Node version: $(node --version)"
RUN echo "NPM version: $(npm --version)"

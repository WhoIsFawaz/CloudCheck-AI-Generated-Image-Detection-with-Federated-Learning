/**
 * @fileoverview gRPC-Web generated client stub for upload
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v5.28.3
// source: upload.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.upload = require('./upload_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.upload.UploadServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.upload.UploadServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.upload.Image,
 *   !proto.upload.UploadResponse>}
 */
const methodDescriptor_UploadService_UploadImage = new grpc.web.MethodDescriptor(
  '/upload.UploadService/UploadImage',
  grpc.web.MethodType.UNARY,
  proto.upload.Image,
  proto.upload.UploadResponse,
  /**
   * @param {!proto.upload.Image} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.upload.UploadResponse.deserializeBinary
);


/**
 * @param {!proto.upload.Image} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.upload.UploadResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.upload.UploadResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.upload.UploadServiceClient.prototype.uploadImage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/upload.UploadService/UploadImage',
      request,
      metadata || {},
      methodDescriptor_UploadService_UploadImage,
      callback);
};


/**
 * @param {!proto.upload.Image} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.upload.UploadResponse>}
 *     Promise that resolves to the response
 */
proto.upload.UploadServicePromiseClient.prototype.uploadImage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/upload.UploadService/UploadImage',
      request,
      metadata || {},
      methodDescriptor_UploadService_UploadImage);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.upload.ImageRequest,
 *   !proto.upload.Image>}
 */
const methodDescriptor_UploadService_GetImage = new grpc.web.MethodDescriptor(
  '/upload.UploadService/GetImage',
  grpc.web.MethodType.UNARY,
  proto.upload.ImageRequest,
  proto.upload.Image,
  /**
   * @param {!proto.upload.ImageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.upload.Image.deserializeBinary
);


/**
 * @param {!proto.upload.ImageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.upload.Image)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.upload.Image>|undefined}
 *     The XHR Node Readable Stream
 */
proto.upload.UploadServiceClient.prototype.getImage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/upload.UploadService/GetImage',
      request,
      metadata || {},
      methodDescriptor_UploadService_GetImage,
      callback);
};


/**
 * @param {!proto.upload.ImageRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.upload.Image>}
 *     Promise that resolves to the response
 */
proto.upload.UploadServicePromiseClient.prototype.getImage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/upload.UploadService/GetImage',
      request,
      metadata || {},
      methodDescriptor_UploadService_GetImage);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.upload.MultipleImageRequest,
 *   !proto.upload.Image>}
 */
const methodDescriptor_UploadService_GetMultipleImages = new grpc.web.MethodDescriptor(
  '/upload.UploadService/GetMultipleImages',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.upload.MultipleImageRequest,
  proto.upload.Image,
  /**
   * @param {!proto.upload.MultipleImageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.upload.Image.deserializeBinary
);


/**
 * @param {!proto.upload.MultipleImageRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.upload.Image>}
 *     The XHR Node Readable Stream
 */
proto.upload.UploadServiceClient.prototype.getMultipleImages =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/upload.UploadService/GetMultipleImages',
      request,
      metadata || {},
      methodDescriptor_UploadService_GetMultipleImages);
};


/**
 * @param {!proto.upload.MultipleImageRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.upload.Image>}
 *     The XHR Node Readable Stream
 */
proto.upload.UploadServicePromiseClient.prototype.getMultipleImages =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/upload.UploadService/GetMultipleImages',
      request,
      metadata || {},
      methodDescriptor_UploadService_GetMultipleImages);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.upload.ImageRequest,
 *   !proto.upload.Response>}
 */
const methodDescriptor_UploadService_DeleteImage = new grpc.web.MethodDescriptor(
  '/upload.UploadService/DeleteImage',
  grpc.web.MethodType.UNARY,
  proto.upload.ImageRequest,
  proto.upload.Response,
  /**
   * @param {!proto.upload.ImageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.upload.Response.deserializeBinary
);


/**
 * @param {!proto.upload.ImageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.upload.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.upload.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.upload.UploadServiceClient.prototype.deleteImage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/upload.UploadService/DeleteImage',
      request,
      metadata || {},
      methodDescriptor_UploadService_DeleteImage,
      callback);
};


/**
 * @param {!proto.upload.ImageRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.upload.Response>}
 *     Promise that resolves to the response
 */
proto.upload.UploadServicePromiseClient.prototype.deleteImage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/upload.UploadService/DeleteImage',
      request,
      metadata || {},
      methodDescriptor_UploadService_DeleteImage);
};


module.exports = proto.upload;


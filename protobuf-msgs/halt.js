/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.Halt');

goog.require('jspb.Message');
goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Halt = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Halt, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	proto.Halt.displayName = 'proto.Halt';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto suitable for use in Soy templates.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	 *     for transitional soy proto support: http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.Halt.prototype.toObject = function (opt_includeInstance) {
		return proto.Halt.toObject(opt_includeInstance, this);
	};


	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Whether to include the JSPB
	 *     instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.Halt} msg The msg instance to transform.
	 * @return {!Object}
	 */
	proto.Halt.toObject = function (includeInstance, msg) {
		var f, obj = {
			acceleration: +jspb.Message.getFieldWithDefault(msg, 1, 0.0)
		};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Halt}
 */
proto.Halt.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.Halt;
	return proto.Halt.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Halt} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Halt}
 */
proto.Halt.deserializeBinaryFromReader = function (msg, reader) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {number} */ (reader.readDouble());
				msg.setAcceleration(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Halt.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.Halt.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Halt} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.Halt.serializeBinaryToWriter = function (message, writer) {
	var f = undefined;
	f = message.getAcceleration();
	if (f !== 0.0) {
		writer.writeDouble(
			1,
			f
		);
	}
};


/**
 * optional double acceleration = 1;
 * @return {number}
 */
proto.Halt.prototype.getAcceleration = function () {
	return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 1, 0.0));
};


/** @param {number} value */
proto.Halt.prototype.setAcceleration = function (value) {
	jspb.Message.setField(this, 1, value);
};



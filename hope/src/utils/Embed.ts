type Embed = {
    title?: string;
    type?: string;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;

    footer?: {
        text: string;
        icon_url?: string;
        proxy_icon_url?: string;
    };
    image?: {
        url?: string;
        proxy_url?: string;
        height?: number;
        width?: number;
    };
    thumbnail?: {
        url?: string;
        proxy_url?: string;
        height?: number;
        width?: number;
    };
    video?: {
        url?: string;
        height?: number;
        width?: number;
    };
    provider?: {
        name?: string;
        url?: string;
    };
    author?: {
        name?: string;
        url?: string;
        icon_url?: string;
        proxy_icon_url?: string;
    };
    fields?: {
        name: string;
        value: string;
        inline?: boolean;
    }[];
};

class EmbedBuilder {
    _title: string;
    _type: string;
    _description: string;
    _url: string;
    _timestamp: string;
    _color: number;

    _footer: {
        text: string;
        icon_url?: string;
        proxy_icon_url?: string;
    };
    _image: {
        url?: string;
        proxy_url?: string;
        height?: number;
        width?: number;
    };
    _thumbnail: {
        url?: string;
        proxy_url?: string;
        height?: number;
        width?: number;
    };
    _video: {
        url?: string;
        height?: number;
        width?: number;
    };
    _provider: {
        name?: string;
        url?: string;
    };
    _author: {
        name?: string;
        url?: string;
        icon_url?: string;
        proxy_icon_url?: string;
    };
    _fields: {
        name: string;
        value: string;
        inline?: boolean;
    }[];


    constructor(data: Embed = {}) {
        this._title = data.title;
        this._type = data.type || "rich";
        this._description = data.description;
        this._url = data.url;
        this._timestamp = data.timestamp;
        this._color = data.color;

        this._footer = data.footer;
        this._image = data.image || {};
        this._thumbnail = data.thumbnail || {};
        this._video = data.video || {};
        this._provider = data.provider || {};
        this._author = data.author || {};
        this._fields = data.fields || [];
    };

    title(title: string) {
        if (title.length > 256) throw new Error("Embed title cannot exceed 256 characters.");
        this._title = title;
        return title;
    };

    type(type: string) {
        this._type = type;
        return type;
    };

    description(description: string) {
        if (description.length > 2048) throw new Error("Embed description cannot exceed 2048 characters.");
        this._description = description;
        return description;
    };

    url(url: string) {
        this._url = url;
        return url;
    };

    timestamp(timestamp: string) {
        this._timestamp = timestamp;
        return timestamp;
    };

    color(color: string) {
        if (typeof color !== "number" || isNaN(color) || color < 0 || color > 0xFFFFFF) throw new Error("Embed color must be a valid HEX color.");

        this._color = color;
        return color;
    };

    footer(text: string, icon_url?: string, proxy_icon_url?: string) {
        if (text.length > 2048) throw new Error("Embed footer text cannot exceed 2048 characters.");
        this._footer = { text, icon_url, proxy_icon_url };
        return this._footer;
    };

    image(url?: string, proxy_url?: string, height?: number, width?: number) {
        this._image = { url, proxy_url, height, width };
        return this._image;
    };

    thumbnail(url?: string, proxy_url?: string, height?: number, width?: number) {
        this._thumbnail = { url, proxy_url, height, width };
        return this._thumbnail;
    };

    video(url?: string, height?: number, width?: number) {
        this._video = { url, height, width };
        return this._video;
    };

    provider(name?: string, url?: string) {
        this._provider = { name, url };
        return this._provider;
    };

    author(name?: string, url?: string, icon_url?: string, proxy_icon_url?: string) {
        if (name.length > 256) throw new Error("Embed author name cannot exceed 256 characters.");
        this._author = { name, url, icon_url, proxy_icon_url };
        return this._author;
    };

    field(name: string, value: string, inline?: boolean) {
        if (name.length > 256) throw new Error("Embed field name cannot exceed 256 characters.");
        if (value.length > 1024) throw new Error("Embed field value cannot exceed 1024 characters.");
        if (this._fields.length >= 25) throw new Error("Embed field limit reached (25).");

        this._fields.push({ name, value, inline });
        return this._fields;
    };

    build() {
        return {
            title: this._title,
            type: this._type,
            description: this._description,
            url: this._url,
            timestamp: this._timestamp,
            color: this._color,

            footer: this._footer,
            image: this._image,
            thumbnail: this._thumbnail,
            video: this._video,
            provider: this._provider,
        };
    };
};

export default {
    EmbedBuilder,
};
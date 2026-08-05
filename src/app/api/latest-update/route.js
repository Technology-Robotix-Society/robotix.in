import { NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const builder = createImageUrlBuilder(client);

function urlFor(source) {
    return builder.image(source);
}

const LATEST_UPDATE_QUERY = `*[_type == "update" && defined(publishedAt)]
  | order(publishedAt desc)[0]{
    _id,
    title,
    publishedAt,
    image,
    body
  }`;

const options = { next: { revalidate: 60 } };

export async function GET() {
    const raw = await client.fetch(LATEST_UPDATE_QUERY, {}, options);

    if (!raw) {
        return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json({
        ...raw,
        imageUrl: raw.image ? urlFor(raw.image).width(800).url() : null,
    });
}
import { NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const builder = createImageUrlBuilder(client);

function urlFor(source) {
    return builder.image(source);
}

const LATEST_UPDATES_QUERY = `*[_type == "update" && defined(publishedAt)]
  | order(publishedAt desc)[0...6]{
    _id,
    title,
    publishedAt,
    image,
    body
  }`;

const options = { next: { revalidate: 60 } };

export async function GET() {
    try {
        const raw = await client.fetch(LATEST_UPDATES_QUERY, {}, options);

        if (!raw || raw.length === 0) {
            return NextResponse.json({ update: null, updates: [] }, { status: 200 });
        }

        const updates = raw.map((u) => ({
            ...u,
            imageUrl: u.image ? urlFor(u.image).width(800).url() : null,
        }));

        const primary = updates[0] || null;

        return NextResponse.json({
            ...primary,
            update: primary,
            updates: updates,
        });
    } catch {
        return NextResponse.json({ update: null, updates: [] }, { status: 500 });
    }
}
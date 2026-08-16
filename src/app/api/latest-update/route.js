import { NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { curatedUpdates } from "@/data/updates";

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
        let sanityUpdates = [];
        try {
            const raw = await client.fetch(LATEST_UPDATES_QUERY, {}, options);
            sanityUpdates = (raw || []).map((u) => ({
                ...u,
                imageUrl: u.image ? urlFor(u.image).width(800).url() : null,
                category: "Selections",
                isLiveSanity: true,
            }));
        } catch {
            sanityUpdates = [];
        }

        const existingIds = new Set(sanityUpdates.map((u) => u._id));
        const combined = [
            ...sanityUpdates,
            ...curatedUpdates.filter((u) => !existingIds.has(u._id)),
        ];

        const primary = combined[0] || null;

        return NextResponse.json({
            ...primary,
            update: primary,
            updates: combined,
        });
    } catch {
        return NextResponse.json({ update: null, updates: curatedUpdates }, { status: 200 });
    }
}
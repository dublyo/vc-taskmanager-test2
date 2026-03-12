import { NextResponse } from 'next/server'

/**
 * UploadThing route handler placeholder.
 * Configure UploadThing by setting the UPLOADTHING_TOKEN env var
 * and implementing your file router here.
 */
export async function POST() {
  if (!process.env.UPLOADTHING_TOKEN) {
    return NextResponse.json(
      { error: 'UploadThing is not configured' },
      { status: 501 }
    )
  }

  // TODO: Implement UploadThing file router
  // See: https://docs.uploadthing.com/getting-started/appdir
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}

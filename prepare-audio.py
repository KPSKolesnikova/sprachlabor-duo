import asyncio
import json
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT.parent / "tts"))
import edge_tts

clips = json.loads((ROOT / "lib/listening.json").read_text(encoding="utf-8"))
destination = ROOT / "public/audio"
destination.mkdir(parents=True, exist_ok=True)
gate = asyncio.Semaphore(5)

async def make_clip(key, script):
    out = destination / f"{key}.mp3"
    if out.is_file() and out.stat().st_size > 2000:
        return
    temp = out.with_suffix(".tmp")
    rate = "-12%" if key.startswith(("a1", "a2")) else "+0%"
    voice = "de-DE-ConradNeural" if key.endswith("-b") else "de-DE-KatjaNeural"
    async with gate:
        for attempt in range(3):
            try:
                await edge_tts.Communicate(script, voice, rate=rate).save(str(temp))
                os.replace(temp, out)
                return
            except Exception:
                if attempt == 2:
                    raise
                await asyncio.sleep(1 + attempt)

async def main():
    await asyncio.gather(*(make_clip(key, script) for key, script in clips.items()))

if __name__ == "__main__":
    asyncio.run(main())

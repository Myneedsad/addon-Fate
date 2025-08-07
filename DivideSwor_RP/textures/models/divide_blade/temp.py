from PIL import Image
from pathlib import Path
import numpy as np

for x in Path("spark").iterdir():
    with Image.open(x).convert("RGBA") as img:
        arr = np.array(img)
        arr[..., 3] = 0

        Image.fromarray(arr).save(f"{x.stem}.tga")

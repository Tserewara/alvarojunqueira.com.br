---
title: 'Testing Markdown'
date: '2023-03-04'
status: 'final'
---

---
# Hey, this is some dope markdown!
```python
from PIL import Image

class ImageCompressor:
    def __init__(self, image_path):
        self.image_path = image_path
    
    def compress(self, compression_ratio):
        # Open the image using Pillow
        with Image.open(self.image_path) as image:
            # Calculate the new dimensions based on the compression ratio
            new_width = int(image.width * compression_ratio)
            new_height = int(image.height * compression_ratio)
            
            # Resize the image using Pillow
            resized_image = image.resize((new_width, new_height))
            
            # Save the compressed image with a new file name
            
```


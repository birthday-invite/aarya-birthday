from gtts import gTTS
import os

text = "Happy Birthday to you! Happy Birthday dear Aarya! Happy Birthday to you!"
tts = gTTS(text=text, lang='en', slow=False)

output_dir = "src/assets"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

output_path = os.path.join(output_dir, "happy_birthday.mp3")
tts.save(output_path)
print(f"Audio saved to {output_path}")

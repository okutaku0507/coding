module TextSplitter
  module_function

  IGNORE_CHARS = ["　", "、", "。", "・"]

  # split("helloあいうworld") #=> ["hello", "あ", "い", "う", "world"]
  # split("foo@example.com") #=> ["foo", "example.com"]
  def split(text)
    ret = []
    prev = 0
    text.chars do |char|
      code = char.codepoints.first
      unless IGNORE_CHARS.include?(char)
        if prev < 0x2100 && code >= 0x2100 || prev >= 0x2100
          ret << char
        elsif char !~ /\A[[:word:]]\z/
          code = 0xffff
        else
          ret.size > 0 ? ret.last << char : ret << char
        end
      end
      prev = code
    end
    ret
  end
end

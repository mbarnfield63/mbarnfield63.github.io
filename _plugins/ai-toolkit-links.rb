# Pages under toolkit/ come from the ai-toolkit repo, written so they read on GitHub.
# Drop the leading "# Title" (the page layout prints the title) and turn relative
# links into site URLs: pages to their URL, images to their static path, anything
# else (scripts, example files) to the GitHub copy. Kramdown drops a list's start
# number, so a list that starts at 0 gets an explicit start attribute.
require "pathname"

Jekyll::Hooks.register :pages, :pre_render do |page|
  next unless page.path.start_with?("toolkit/")

  site = page.site
  dir = File.dirname(page.path)
  page.content = page.content.sub(/\A\s*# .*\n/, "").gsub(/^0\. /, "{: start=\"0\"}\n0. ").gsub(/\]\((?![a-z]+:|#|\/)([^)#\s]+)(#[^)\s]*)?\)/) do
    target = Pathname.new(File.join(dir, Regexp.last_match(1))).cleanpath.to_s
    anchor = Regexp.last_match(2)
    url =
      if (p = site.pages.find { |x| x.path == target }) then p.url
      elsif site.static_files.any? { |f| f.relative_path == "/#{target}" } then "/#{target}"
      else "https://github.com/mbarnfield63/ai-toolkit/tree/main/#{target.delete_prefix('toolkit/')}"
      end
    "](#{url}#{anchor})"
  end
end

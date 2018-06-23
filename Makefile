all:
	git config --local user.name "Yannick Roffin"
	git config --local user.email "yroffin@gmail.com"
	git tag "$(shell date +'%Y%m%d-%H%M%S')"
	git push --tags

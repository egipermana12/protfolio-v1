
export const getExcerpt = (html, limit = 200) => {
	const text = html.replace(/<[^>]*>/g, '');
  	return text.length > limit ? text.slice(0, limit) + '...' : text;
}
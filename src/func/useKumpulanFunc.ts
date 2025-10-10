
export const getExcerpt = (html, limit = 200) => {
	const safeHtml = html || ''; 
	const text = safeHtml.replace(/<[^>]*>/g, '');
  	return text.length > limit ? text.slice(0, limit) + '...' : text;
}
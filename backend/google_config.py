import urllib.parse as urlparse
from urllib.parse import urlencode

from config import GOOGLE_OAUTH2_CLIENT_ID

url = "https://accounts.google.com/o/oauth2/v2/auth?"
params = {
    "scope" : "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
    "access_type" : "offline",
    "response_type" : "code",
    "state" : "state_parameter_passthrough_value",
    "redirect_uri" : "http://localhost:5000/auth/google/authorize",
    "client_id" : GOOGLE_OAUTH2_CLIENT_ID
}
url_parse = urlparse.urlparse(url)
query = url_parse.query
url_dict = dict(urlparse.parse_qsl(query))
url_dict.update(params)
url_new_query = urlparse.urlencode(url_dict)
url_parse = url_parse._replace(query=url_new_query)
new_url = urlparse.urlunparse(url_parse)

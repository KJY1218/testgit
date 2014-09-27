class Config(object):
	SECRET_KEY = "likelion-flaskr-secret-key"
    pass


class Production(Config):
    DEBUG = False
    pass

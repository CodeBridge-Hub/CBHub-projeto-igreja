from sqlalchemy import types


class ChoiceType(types.TypeDecorator):
    """
    A custom SQLAlchemy type to emulate Django's ChoiceField.
    Stores an integer in the database and presents a string in the model.
    """

    impl = types.Integer  # This is the type that will be stored in the database

    def __init__(self, choices, **kw):
        """
        :param choices: A dictionary where keys are integers (DB values) and
                        values are strings (Python model values).
        """
        self.choices = choices
        self.reverse_choices = {v: k for k, v in choices.items()}
        super(ChoiceType, self).__init__(**kw)

    def process_bind_param(self, value, dialect):
        """Convert a string from the model to an integer for the database."""
        if value is None:
            return None
        return self.reverse_choices.get(value)

    def process_result_value(self, value, dialect):
        """Convert an integer from the database to a string for the model."""
        if value is None:
            return None
        return self.choices.get(value)


def exception_details(e: Exception):
    """Format the details JSON of a HTTPException response"""
    return [
        {
            "type": e.__class__.__name__,
            "msg": e.args[0],
        },
    ]

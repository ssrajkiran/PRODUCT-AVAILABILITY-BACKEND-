def model_to_list(instance):
    """
    Takes a Django model instance and returns a list of its field values.
    """
    fields = instance._meta.fields
    return [getattr(instance, f.name) for f in fields]

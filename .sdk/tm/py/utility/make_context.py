# MetMuseumCollection SDK utility: make_context

from core.context import MetMuseumCollectionContext


def make_context_util(ctxmap, basectx):
    return MetMuseumCollectionContext(ctxmap, basectx)

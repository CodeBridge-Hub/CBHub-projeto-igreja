def rebuild_schemas():
    from .atendimentos.schemas import ServicoSchema, AtendimentosSchema, SessaoDeAtendimentoSchema
    from .cadastros.schemas import AtendimentoCadastroGeralSchema, CadastroGeralSchema, CreateCadastroGeralSchema

    AtendimentoCadastroGeralSchema.model_rebuild()
    AtendimentosSchema.model_rebuild()
    SessaoDeAtendimentoSchema.model_rebuild()

const MODULE_ID = 'pfu-babele-ptbr'; // Change this ID!

// No need to change the code below this line, but it’s your module so do it if you want!

Hooks.on('init', () => {
  game.settings.register(MODULE_ID, 'autoRegisterBabel', {
    name: 'Automatically activate translation via Babele',
    hint: 'Automatically implements Babele translations without needing to point to the directory containing the translations.',
    scope: 'world',
    config: true,
    default: true,
    type: Boolean,
    onChange: value => {
      if (value) {
        autoRegisterBabel();
      }

      window.location.reload();
    },
  });

  if (game.settings.get(MODULE_ID, 'autoRegisterBabel')) {
    autoRegisterBabel();
  }
});

function autoRegisterBabel() {
  if (typeof Babele !== 'undefined') {
    Babele.get().register({
      module: MODULE_ID,
      lang: 'pt-BR',
      dir: 'compendium/pt-BR',
    });
  }
}

Babele.get().registerConverters({
  "effectConverter": (effects, translation) => { 
     return effects.map(effect => {
        return mergeObject(effect, translation);
     });
  }
});
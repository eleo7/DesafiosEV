export const games={
fc:{name:'FC 26',icon:'⚽',tag:'FUTEBOL',description:'Uma nova história para cada temporada.',modes:{manager:'Carreira treinador',player:'Carreira jogador'}},
elden:{name:'Elden Ring',icon:'⚔',tag:'RPG / AÇÃO',description:'Sua próxima lenda começa com uma regra.',modes:{journey:'Jornada',boss:'Caça aos chefes'}},
hunter:{name:'theHunter: Call of the Wild',icon:'♧',tag:'CAÇA / EXPLORAÇÃO',description:'Paciência, precisão e um novo objetivo.',modes:{hunt:'Expedição',photo:'Observação'}}};
const pick=(a,r)=>a[Math.min(a.length-1,Math.floor(r()*a.length))];
export function generate(game,mode,difficulty='normal',rng=Math.random){
if(!games[game]?.modes[mode]||!['easy','normal','hard'].includes(difficulty))throw Error('Seleção inválida');
let title,rules,theme;
const extra=difficulty==='hard';
if(game==='fc'){
const team=pick(['Arsenal','Liverpool','Barcelona','Real Madrid','Bayern München','Inter','Borussia Dortmund','Atlético de Madrid'],rng);
const formation=pick(['4-3-3','4-2-3-1','4-4-2','3-5-2'],rng);
if(mode==='manager'){title=`${pick(['Conquiste a Champions League','Vença a liga nacional','Conquiste a copa nacional'],rng)} com o ${team}`;rules=[`Use a formação ${formation}.`,pick(['Escale no máximo 1 jogador com mais de 30 anos.','Escale pelo menos 2 jogadores com até 23 anos.','Mantenha pelo menos 3 jogadores da base do elenco inicial.'],rng),extra?'Não faça contratações durante a temporada.':'Limite as contratações a 2 por temporada.'];}
else {title=`Seja protagonista no ${team}`;rules=[`Jogue como ${pick(['atacante','meia','ponta'],rng)}.`,`Alcance ${difficulty==='easy'?10:extra?30:20} participações em gols em uma temporada.`,pick(['Não solicite transferência nessa temporada.','Dispute todas as partidas disponíveis sem simular.'],rng)];}
theme='Uma temporada. Uma identidade. Seu legado.';
}else if(game==='elden'){
const build=pick([{name:'Zoro',rule:'Use somente espadas empunhadas com uma mão; pode usar uma em cada mão.'},{name:'Ronin',rule:'Use somente katanas como armas.'},{name:'Cavaleiro errante',rule:'Use espada reta e escudo.'},{name:'Caçador',rule:'Use somente arcos para causar dano.'}],rng);
title=mode==='boss'?`Derrote ${pick(['Margit','Godrick','Rennala'],rng)} como ${build.name}`:`Viva a jornada de ${build.name}`;
rules=[build.rule,mode==='journey'?'Derrote 3 chefes ainda vivos no seu mundo.':'Se o chefe já morreu, use um novo personagem ou NG+.',extra?'Sem invocações de espíritos ou cooperação.':pick(['Invocações de espíritos permitidas.','Sem feitiços ou encantamentos ofensivos.'],rng)];theme='Uma inspiração de personagem, adaptada às regras do jogo.';
}else{
title=mode==='photo'?'Um encontro sem disparos':`Encontre seu ${difficulty==='hard'?'primeiro javali de classificação diamante':'próximo javali'}`;
rules=mode==='photo'?['Localize um javali em uma reserva onde a espécie esteja disponível.','Faça uma captura de tela com o animal visível.','Conclua a observação sem disparar.']:['Escolha uma reserva que tenha javalis e equipamento adequado à classe da espécie.',pick(['Aproxime-se a menos de 100 metros antes de disparar.','Faça a aproximação final sem correr.'],rng),'Passe nas verificações de abate do jogo.'];theme='A classificação depende do animal encontrado; não há garantia de spawn.';
}
if(difficulty==='easy'&&rules.length>2)rules=rules.slice(0,2);
return {game,mode,difficulty,title,rules,theme,signature:JSON.stringify([game,mode,difficulty,title,rules])};
}
export function draw(game,mode,difficulty,history=[],rng=Math.random){let result;for(let i=0;i<80;i++){result=generate(game,mode,difficulty,rng);if(!history.includes(result.signature))return result;}return {...result,repeated:true};}

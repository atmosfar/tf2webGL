var hostname = 'http://'+document.location.hostname+':3600';
var socket = io.connect(hostname);

var definedTeams = {
'(blank)' : { 
    'players': {
        '0':{'Name': '', 'Role': '', 'Country': '', 'Notes': ''},
        '1':{'Name': '', 'Role': '', 'Country': '', 'Notes': ''},
        '2':{'Name': '', 'Role': '', 'Country': '', 'Notes': ''},
        '3':{'Name': '', 'Role': '', 'Country': '', 'Notes': ''},
        '4':{'Name': '', 'Role': '', 'Country': '', 'Notes': ''},
        '5':{'Name': '', 'Role': '', 'Country': '', 'Notes': ''}
    },
    'tag': {
        'value':'',
        'postfix':false
    },
    'geo':{
        'flag':'',
        'region':'',
    }
}
,
'iT' : {   
    'players': {
        '5':{'Name': 'indust', 'Role': 'Medic', 'Country': 'USA', 'Notes': ''},
        '4':{'Name': 'xalox', 'Role': 'Demoman', 'Country': 'USA', 'Notes': ''},
        '3':{'Name': 'lansky', 'Role': 'Pocket', 'Country': 'USA', 'Notes': ''},
        '2':{'Name': 'rr-', 'Role': 'Roamer', 'Country': 'USA', 'Notes': ''},
        '1':{'Name': 'b4nny', 'Role': 'Scout', 'Country': 'USA', 'Notes': ''},
        '0':{'Name': 'Shrugger', 'Role': 'Scout', 'Country': 'USA', 'Notes': ''}
    },
    'tag': {
        'value':'_iT',
        'postfix':true
    },
    'geo':{
        'flag':'US',
        'region':'NA',
    }

}          
,          
'Classic Mixup' : {
    'players': {
            '5':{'Name': 'harbleu', 'Role': 'Medic', 'Country': 'USA', 'Notes': ''},
            '4':{'Name': 'Platinum', 'Role': 'Demoman', 'Country': 'USA', 'Notes': ''},
            '3':{'Name': 'TLR', 'Role': 'Pocket', 'Country': 'USA', 'Notes': ''},
            '2':{'Name': 'A_Seagull', 'Role': 'Roamer', 'Country': 'USA', 'Notes': ''},
            '1':{'Name': 'enigma', 'Role': 'Scout', 'Country': 'USA', 'Notes': 'TFTV Admin'},
            '0':{'Name': 'SkyeHigh', 'Role': 'Scout', 'Country': 'Canada', 'Notes': 'AKA Squid'}
    },
    'tag': {
        'value':'mix^ ',
        'postfix':false
    },
    'geo':{
        'flag':'US',
        'region':'NA',
    }

}          
,          
'Lost in Translation' : {
    'players': {
            '5':{'Name': 'pascal_', 'Role': 'Medic', 'Country': 'Canada', 'Notes': 'AKA alfa'},
            '4':{'Name': 'Bdonski', 'Role': 'Demoman', 'Country': 'USA', 'Notes': ''},
            '3':{'Name': 'Smakers', 'Role': 'Pocket', 'Country': 'USA', 'Notes': ''},
            '2':{'Name': 'Ma3la', 'Role': 'Roamer', 'Country': 'USA', 'Notes': 'Formerly IARESNIPAR'},
            '1':{'Name': 'Decimate', 'Role': 'Scout', 'Country': 'USA', 'Notes': ''},
            '0':{'Name': 'Sezco', 'Role': 'Scout', 'Country': 'USA', 'Notes': ''}
    },
    'tag': {
        'value':'.liT',
        'postfix':true
    },
    'geo':{
        'flag':'US',
        'region':'NA',
    }

}          
,          
'WELOVEANIME' : {
    'players': {
            '5':{'Name': 'WirelessFox', 'Role': 'Medic', 'Country': 'Canada', 'Notes': ''},
            '4':{'Name': 'Phrakture', 'Role': 'Demoman', 'Country': 'USA', 'Notes': ''},
            '3':{'Name': 'SS_', 'Role': 'Pocket', 'Country': 'USA', 'Notes': ''},
            '2':{'Name': 'Mangachu', 'Role': 'Roamer', 'Country': 'Canada', 'Notes': ''},
            '1':{'Name': 'Jav', 'Role': 'Scout', 'Country': 'USA', 'Notes': ''},
            '0':{'Name': 'Stratovarius', 'Role': 'Scout', 'Country': 'Canada', 'Notes': ''}
    },
    'tag':{
        'value':'lovesit',
        'postfix':true
    },
    'geo':{
        'flag':'US',
        'region':'NA',
    }

},
'Evokate Gaming' : {  
    'players': {
            '5':{'Name': 'Bulle', 'Role': 'Medic', 'Country': 'France', 'Notes': ''},
            '4':{'Name': 'Exon', 'Role': 'Demoman', 'Country': 'France', 'Notes': ''},
            '3':{'Name': 'Tek', 'Role': 'Pocket', 'Country': 'France', 'Notes': ''},
            '2':{'Name': 'T-Mac', 'Role': 'Roamer', 'Country': 'France', 'Notes': ''},
            '1':{'Name': 'Plapla', 'Role': 'Scout', 'Country': 'France', 'Notes': ''},
            '0':{'Name': 'Flippy', 'Role': 'Scout', 'Country': 'France', 'Notes': ''}
    },
    'tag': {
        'value':' * ROCCAT',
        'postfix':true
    },
    'geo':{
        'flag':'FR',
        'region':'EU',
    }

}          
,          
'Mais La Moule !' : {
    'players': {
            '5':{'Name': 'mitsy', 'Role': 'Medic', 'Country': 'Germany', 'Notes': ''},
            '4':{'Name': 'Nadir', 'Role': 'Demoman', 'Country': 'Switzerland', 'Notes': ''},
            '3':{'Name': 'KnOxXx', 'Role': 'Pocket', 'Country': 'France', 'Notes': ''},
            '2':{'Name': 'Pierre', 'Role': 'Roamer', 'Country': 'France', 'Notes': 'AKA CaptainHax'},
            '1':{'Name': 'Droso', 'Role': 'Scout', 'Country': 'Germany', 'Notes': ''},
            '0':{'Name': 'fl1p', 'Role': 'Scout', 'Country': 'France', 'Notes': ''}
    },
    'tag': {
        'value':'mLm ',
        'postfix':false
    },
    'geo':{
        'flag':'FR',
        'region':'EU',
    }

}          
,          
'Dotter' : {
    'players': {
            '5':{'Name': '2nuts', 'Role': 'Medic', 'Country': 'Sweden', 'Notes': ''},
            '4':{'Name': 'ryb', 'Role': 'Demoman', 'Country': 'Sweden', 'Notes': ''},
            '3':{'Name': 'Knutsson', 'Role': 'Pocket', 'Country': 'Sweden', 'Notes': ''},
            '2':{'Name': 'Zebbosai', 'Role': 'Roamer', 'Country': 'Canada', 'Notes': ''},
            '1':{'Name': 'wltrs', 'Role': 'Scout', 'Country': 'Sweden', 'Notes': 'Aggressive Scout'},
            '0':{'Name': 'BeaVerN', 'Role': 'Scout', 'Country': 'Sweden', 'Notes': 'Pocket Scout'}
    },
    'tag':{
        'value':'.',
        'postfix':false
    },
    'geo':{
        'flag':'SE',
        'region':'EU',
    }

}
,          
'The Last Resort' : {
    'players': {
            '5':{'Name': 'kiler4fun', 'Role': 'Medic', 'Country': 'Spain', 'Notes': ''},
            '4':{'Name': 'HYS', 'Role': 'Demoman', 'Country': 'England', 'Notes': ''},
            '3':{'Name': 'kalho', 'Role': 'Pocket', 'Country': 'Spain', 'Notes': ''},
            '2':{'Name': 'Rising', 'Role': 'Roamer', 'Country': 'Germany', 'Notes': ''},
            '1':{'Name': 'Rake', 'Role': 'Scout', 'Country': 'Finland', 'Notes': ''},
            '0':{'Name': 'Mirelin', 'Role': 'Scout', 'Country': 'Latvia', 'Notes': ''}
    },
    'tag':{
        'value':'TLR ',
        'postfix':false
    },
    'geo':{
        'flag':'EU',
        'region':'EU',
    }

}
,          
'Made In Germany' : {
    'players': {
            '5':{'Name': 'ThUn', 'Role': 'Medic', 'Country': 'Germany', 'Notes': ''},
            '4':{'Name': 'kaidus', 'Role': 'Demoman', 'Country': 'England', 'Notes': ''},
            '3':{'Name': 'ipz-', 'Role': 'Pocket', 'Country': 'Germany', 'Notes': ''},
            '2':{'Name': 'GeaR', 'Role': 'Roamer', 'Country': 'Germany', 'Notes': ''},
            '1':{'Name': 'basH', 'Role': 'Scout', 'Country': 'Germany', 'Notes': ''},
            '0':{'Name': 'smzii', 'Role': 'Scout', 'Country': 'Germany', 'Notes': ''}
    },
    'tag':{
        'value':'mig #',
        'postfix':false
    },
    'geo':{
        'flag':'DE',
        'region':'EU',
    }

}
,          
'LEGO' : {
    'players': {
            '5':{'Name': 'F2', 'Role': 'Medic', 'Country': 'Denmark', 'Notes': ''},
            '4':{'Name': 'Dr.Phil', 'Role': 'Demoman', 'Country': 'Denmark', 'Notes': ''},
            '3':{'Name': 'Natural', 'Role': 'Pocket', 'Country': 'Denmark', 'Notes': ''},
            '2':{'Name': 'Crizzl', 'Role': 'Roamer', 'Country': 'Denmark', 'Notes': ''},
            '1':{'Name': 'helberg', 'Role': 'Scout', 'Country': 'Denmark', 'Notes': ''},
            '0':{'Name': 'zen', 'Role': 'Scout', 'Country': 'Denmark', 'Notes': ''}
    },
    'tag':{
        'value':'LEGO ',
        'postfix':false
    },
    'geo':{
        'flag':'DK',
        'region':'EU',
    }

}
,          
'Ayo Gurl Sugadaddy Hoody Pussy Creepers' : {
    'players': {
            '5':{'Name': 'kingofsquirrels', 'Role': 'Medic', 'Country': 'England', 'Notes': ''},
            '4':{'Name': 'stilteR', 'Role': 'Demoman', 'Country': 'England', 'Notes': 'AKA Mike'},
            '3':{'Name': 'Starkie', 'Role': 'Pocket', 'Country': 'England', 'Notes': ''},
            '2':{'Name': 'Sideshow', 'Role': 'Roamer', 'Country': 'England', 'Notes': ''},
            '1':{'Name': 'Hawku', 'Role': 'Scout', 'Country': 'England', 'Notes': ''},
            '0':{'Name': 'Permzilla', 'Role': 'Scout', 'Country': 'England', 'Notes': ''}
    },
    'tag':{
        'value':'AYO ',
        'postfix':false
    },
    'geo':{
        'flag':'UK',
        'region':'EU',
    }

}
}; 

function fillTeam(teamNo, teamName){
    var teamDiv = '#team'+teamNo;
    var teamData = (definedTeams[teamName]);
    var playersData = teamData.players;
    var tagData = teamData.tag;
    for(p in playersData){
        var player = playersData[p];
        $(teamDiv+' .player:eq('+p+') .name').val(player.Name); //this should really be done using matching keys in an .each()
        $(teamDiv+' .player:eq('+p+') .country').val(player.Country);
        $(teamDiv+' .player:eq('+p+') .notes').val(player.Notes);
    }
    $('#teamname'+teamNo).val(tagData.value);
    if(tagData.postfix){
        $('#postfixcheck'+teamNo).prop("checked", true).change();
    }
    else {
        $('#postfixcheck'+teamNo).prop("checked", false).change();
    }
}

socket.on('message', function (data){
    if(typeof data.message != "undefined") {                                                                                                                          
        var msg = data.message;                                                                                                                                       
        try {                                                                                                                                                         
            parseMessage(msg);
        }                                                                                                                                                             
        catch(e) {                                                                                                                                                    
            console.log(msg);                                                                                                                                          
        }                                                                                                                                                             
    }
});

function parseMessage(_msg){
    if(typeof _msg.type != "undefined"){
        switch(_msg.type){
            case 'door':
                if(_msg.doorstatus){
                    $('#status #door').removeClass('closed');
                }
                else {
                    $('#status #door').addClass('closed');
                }
                break;
            case 'player':
                $('#status #player').text(_msg.playername);
                $('.name').each(function(i){
                    if($('.name:eq('+i+')').val() == _msg.playername){
                        $('.player:eq('+i+')').addClass('displayed');
                    }
                    else {
                        $('.player:eq('+i+')').removeClass('displayed');
                    }
                });
                break;
            case 'background':
                $('#status #background').text(_msg.backgroundname);
                break;
            default:
                console.log(_msg);
                break;
        }
    }
}

function displayPlayer(e, team){
    var index = e.target.name;
    var playerName = $('.name').eq(index).val();
    var playerTeam = team;
    var playerCountry =  $('.country').eq(index).val();
    var playerNotes = $('.notes').eq(index).val();
    var playerRole;
    switch((index)%6){
        case 0:
        case 1:
            playerRole = "Scout";
            break;
        case 2:
            playerRole = "Roamer";
            break;
        case 3:
            playerRole = "Pocket";
            break;
        case 4:
            playerRole = "Demoman";
            break;
        case 5:
            playerRole = "Medic";
            break;
        default:
            playerRole = "?";
            break;
    }
    var playerInfo = {'Name': playerName, 'Role': playerRole, 'Country': playerCountry, 'Notes': playerNotes, 'Team': playerTeam};
    var JSONplayerInfo = JSON.stringify(playerInfo);            
    socket.emit('send', {message: JSONplayerInfo, content: 'playerInfo' });
}
function sixesForm(team){
    var teamDiv = '#team'+team;
    var teamNameDiv = '#teamname'+team;            
    var teamHeadDiv = '#teamhead'+team;

    var postFixCheck = document.createElement("input");
    var postFixLabel = document.createElement("label");
    $(postFixLabel).text(' postfixed: ');
    $(postFixCheck).attr('type','checkbox');
    $(postFixCheck).attr('id', 'postfixcheck'+team);
    $(postFixLabel).attr('id', 'postfixlabel'+team);

    $(postFixCheck).change(function(){
        $(teamDiv+' .name').each(function(i){
            var e = $(teamDiv+' .name:eq('+i+')');
            var tag = $(teamNameDiv).val();
            var tagStrip = e.val().replace(tag, '');
            var retagged = $(postFixCheck).prop('checked') ? tagStrip+tag : tag+tagStrip;
            e.val(retagged);
        });
    });

    $(postFixCheck).appendTo(postFixLabel);
    $(postFixLabel).appendTo(teamHeadDiv);

    for (var i=0; i<6; i++){
        var playerDiv = document.createElement("div");
        $(playerDiv).addClass('player');
        var nameInput = document.createElement("input");
        $(nameInput).attr('type','text');
        $(nameInput).addClass('name');
        //$(nameInput).attr('tabindex', 1+i+(7*(team-1)));
        $(nameInput).focus(function(e){
            this.selectionStart = this.selectionEnd = this.value.length;
            $(this).select(false);
        });
        var countryInput = document.createElement("input");
        $(countryInput).addClass('country');
        $(countryInput).attr('name','country');
        $(countryInput).attr('type','text');
        //$(countryInput).attr('tabindex', 14+i+(6*(team-1)));
        var notesInput = document.createElement("input");
        $(notesInput).addClass('notes');
        $(notesInput).attr('name','notes');
        $(notesInput).attr('type','text');
        //$(notesInput).attr('tabindex', 26+i+(6*(team-1)));
        var displayButton = document.createElement("button");
        $(displayButton).text('Display');
        $(displayButton).attr('name', i+(6*(team-1)));
        $(displayButton).click(function(e){displayPlayer(e, team)});
        var linebreak = document.createElement("br");
        $(nameInput).appendTo(playerDiv);
        $(countryInput).appendTo(playerDiv);
        $(notesInput).appendTo(playerDiv);
        $(displayButton).appendTo(playerDiv);
        $(linebreak).appendTo(playerDiv);
        $(playerDiv).appendTo(teamDiv);
    }
    
    var elem = $(teamNameDiv);
    elem.val('');
    elem.data('oldVal', elem.val());
    elem.bind("propertychange keyup input paste", function(event){
        if (elem.data('oldVal') != elem.val()) {
            $(teamDiv+' .name').each(function(i){
                var e = $(teamDiv+' .name:eq('+i+')');
                e.val(e.val().replace(elem.data('oldVal'), elem.val()));
            });
            elem.data('oldVal', elem.val());
        }
    });            

    var teamSelect = document.createElement("select"); 
    teamSelect.onchange = function(){fillTeam(team, this.value)};
    for (teamName in definedTeams){
        var teamOption = document.createElement("option");
        teamOption.value = teamName;
        teamOption.innerHTML = teamName;
        teamSelect.appendChild(teamOption);
    }
    $(teamSelect).appendTo(teamHeadDiv);
}

$(document).ready(function(){

    sixesForm('1');
    sixesForm('2');
    
    $('.player').each( function(index){
        var roleIcon = document.createElement("img");
        $(roleIcon).addClass('icon');
        switch(index%6){
            case 0:
            case 1:
                $(roleIcon).attr('src','images/scout_icon.png');
                break;
            case 2:
                $(roleIcon).attr('src','images/soldier_icon.png');
                $(roleIcon).attr('title', 'Roamer');
                break;
            case 3:
                $(roleIcon).attr('src','images/soldier_icon.png');
                $(roleIcon).attr('title', 'Pocket');
                break;
            case 4:
                $(roleIcon).attr('src','images/demoman_icon.png');
                break;    
            case 5:
                $(roleIcon).attr('src','images/medic_icon.png');
                break;  
        }
        $(roleIcon).prependTo(this);
    });
    
    $('#nameColumn').css('padding-left', 3+$('.icon').outerWidth());
    $('#countryColumn').css('padding-left', 3+$('.name').outerWidth()-$('#nameColumn').width());
    $('#notesColumn').css('padding-left', 3+$('.country').outerWidth()-$('#countryColumn').width());
    $('#columnNames').clone().prependTo('#team2');
    $('#teamname1').focus();
});

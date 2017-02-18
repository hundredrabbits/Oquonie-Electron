function Stage()
{
  this.element = document.createElement("stage");

  this.room = null;

  this.install = function()
  {
    oquonie.element.appendChild(this.element);
  }

  this.leave_room = function()
  {
    if(!this.room){ return; }

    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
  }

  this.enter_room = function(room_id,x = 0,y = 0)
  {
    console.log("Entering Room: "+room_id);

    if(!oquonie.world.rooms[room_id]){
      console.log("Missing room:("+room_id+")");
      return;
    }

    this.leave_room();

    this.room = oquonie.world.rooms[room_id];
    this.element.appendChild(this.room.element);

    this.room.show();

    oquonie.player.move_at(x,y);

    oquonie.element.setAttribute("class",this.room.theme);
  }

  this.tile_at = function(x,y)
  {
    for (var i = 0; i < this.room.events.length; i++){
      var tile = this.room.events[i];
      if(tile.x == x && tile.y == y){ return tile; }
    }
  }

  this.floor_at = function(x,y)
  {
    if(x == -1 && y ==  1){ return this.room.floors[0]; }
    if(x ==  0 && y ==  1){ return this.room.floors[1]; }
    if(x ==  1 && y ==  1){ return this.room.floors[2]; }

    if(x == -1 && y ==  0){ return this.room.floors[3]; }
    if(x ==  0 && y ==  0){ return this.room.floors[4]; }
    if(x ==  1 && y ==  0){ return this.room.floors[5]; }

    if(x == -1 && y == -1){ return this.room.floors[6]; }
    if(x ==  0 && y == -1){ return this.room.floors[7]; }
    if(x ==  1 && y == -1){ return this.room.floors[8]; }

    return null;
  }
}
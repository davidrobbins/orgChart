
guidedModel =// @startlock
{
	Employee :
	{
		events :
		{
			onRestrictingQuery:function()
			{// @endlock
				var utility= require('utility');
				if(currentSession().belongsTo(__myNameSpace.DirectoryROLES.ADMINISTRATOR)){
					return this.all();
				} else if (!sessionStorage.ID) {
					return this.createEntityCollection();
				} else {
					var myUser = ds.Employee.find("email = :1", currentSession().user.name);
					if (myUser != null) 
						return utility.getSubordinates(myUser);
					else
						return this.createEntityCollection();
				}
			}// @startlock
		},
		entityMethods :
		{// @endlock
			validatePassword:function(password)
			{// @lock
				var ha1 = directory.computeHA1(this.ID, password);
				return (ha1 === this.HA1Key); //true if validated, false otherwise.
			}// @startlock
		},
		password :
		{
			onSet:function(value)
			{// @endlock
				this.HA1Key = directory.computeHA1(this.ID, value);
			},// @startlock
			onGet:function()
			{// @endlock
					return "*****"; //could also return Null.
			}// @startlock
		}
	}
};// @endlock

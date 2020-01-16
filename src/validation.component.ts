export class Validation {

	public static validationjson  = {

		
		

		"addDeliverGroup":{
			"deliveryGroupName": {
				"required": {
					"msg": "Please enter deliver group name."
				}
			},
			"redirectTimeout": {
				"positiveInteger": {
					"msg": "Please enter positive number."
				}
			}
		},

		"addCategory":{
			"categoryName": {
				"required": {
					"msg": "Please enter a name for category."
				}
			}
		},
		"addProduct":{
			"productName": {
				"required": {
					"msg": "Please enter a name for the product."
				}
			},
			"categoryID": {
				"required": {
					"msg": "Please select a category to create the product."
				}
			},
			"price": {
				"required": {
					"msg": "Please enter the price of the product."
				}
			},
			"URL": {
				"required": {
					"msg": "Please enter a unique URL for this product."
				}
			}
		}
	}
}

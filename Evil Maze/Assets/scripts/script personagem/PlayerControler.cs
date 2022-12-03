using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerControler : MonoBehaviour
{
   [SerializeField] private Transform player;
   private Vector3 dire;
   private Rigidbody rb;

    [SerializeField] private float rY;
    [SerializeField] private float rX;

    // Start is called before the first frame update
    void Start()
    {
        rb = GetComponent<Rigidbody>();
    }

    // Update is called once per frame
    void Update()
    {
        dire = player.TransformVector(new Vector3(Input.GetAxisRaw("Horizontal"), 0, Input.GetAxisRaw("Vertical")).normalized);
        
        rX = Mathf.Lerp(rX, Input.GetAxisRaw("Mouse X") * 2, 100 * Time.deltaTime);
        rY = Mathf.Clamp(rY - (Input.GetAxisRaw("Mouse Y") * 2 * 100 * Time.deltaTime), -30, 30);

        player.Rotate(0, rX, 0, Space.World);
    }

    private void FixedUpdate()
    {
        rb.MovePosition(rb.position + dire * 10 * Time.fixedDeltaTime);
    }
}
